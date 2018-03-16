exports['X-DNS-Prefetch-Control'] = ({ allow = false }) => {
	if (typeof allow !== 'boolean') throw new Error('[X-DNS-Prefetch-Control] allow must be a boolean.');
	return allow ? 'on' : 'off';
};

exports['X-Frame-Options'] = ({ action = 'SAMEORIGIN', domain }) => {
	let ret;

	if (typeof action === 'string')	ret = action.toUpperCase();
	else throw new Error('[X-Frame-Options] Action must be a string');

	if (!['DENY', 'SAMEORIGIN', 'ALLOW-FROM'].includes(ret)) throw new Error('[X-Frame-Options] Action must be DENY, SAMEORIGIN, or ALLOW-FROM.');

	if (ret === 'ALLOW-FROM') {
		if (!domain) throw new Error('[X-Frame-Options] Domain is required when using ALLOW-FROM');
		else if (typeof domain !== 'string') throw new Error('[X-Frame-Options] Domain must be a string.');

		ret += ` ${domain}`;
	}

	return ret;
};

exports['X-Powered-By'] = (opts) => {
	if (typeof opts === 'string' && opts) return opts;
	else if (typeof opts === 'boolean') return opts ? 'null' : '';
	else throw new Error('[X-Powered-By] Expected options to be a boolean or a string.');
};

exports['Strict-Transport-Security'] = ({ maxAge = 5184000, includeSubDomains = true, preload = false }) => {
	if (typeof maxAge !== 'number') throw new Error('[Strict-Transport-Security] maxAge must be a number.');
	else if (typeof includeSubDomains !== 'boolean') throw new Error('[Strict-Transport-Security] includeSubDomains must be a boolean.');
	else if (typeof preload !== 'boolean') throw new Error('[Strict-Transport-Security] preload must be a boolean.');

	return `max-age=${Math.round(maxAge)}${includeSubDomains ? '; includeSubDomains' : ''}${preload ? '; preload' : ''}`;
};

exports['X-Download-Options'] = (opts) => {
	if (typeof opts !== 'boolean') throw new Error('[X-Download-Options] options must be a boolean.');

	return opts ? 'noopen' : '';
};

exports['X-Content-Type-Options'] = (opts) => {
	if (typeof opts !== 'boolean') throw new Error('[X-Content-Type-Options] options must be a boolean.');

	return opts ? 'nosniff' : '';
};

exports['X-XSS-Protection'] = (opts) => {
	const header = '1; mode=block';

	if (typeof opts === 'boolean') return opts ? header : '';
	else if (typeof opts === 'object' && opts.reportUri) return `${header}; report=${opts.reportUri}`;
	else throw new Error('[X-XSS-Protection] Expected options to be a boolean or an object with reportUri property.');
};

exports['Expect-CT'] = ({ enforce, maxAge, reportUri }) => {
	const vals = [];

	if (enforce && typeof enforce === 'boolean') vals.push('enforce');
	if (reportUri && typeof reportUri === 'string') vals.push(`report-uri="${reportUri}"`);
	vals.push(`max-age=${parseMaxAge(maxAge)}`);

	return vals.join('; ');
};

exports['Cache-Control'] = (opts) => {
	if (typeof opts !== 'boolean') throw new Error('[Cache-Control] options must be a boolean');

	return 'no-store, no-cache, must-revalidate, proxy-revalidate';
};

exports.Pragma = (opts) => {
	if (typeof opts !== 'boolean') throw new Error('[Pragma] options must be a boolean');

	return 'no-cache';
};

exports.Expires = (opts) => {
	if (typeof opts !== 'boolean') throw new Error('[Expires] options must be a boolean');

	return '0';
};

exports['Surrogate-Control'] = (opts) => {
	if (typeof opts !== 'boolean') throw new Error('[Expires] options must be a boolean');

	return 'no-store';
};

const parseMaxAge = (num) => {
	if (!num) return 0;
	else if (typeof num !== 'number' || num < 0) throw new Error(`${num} is not a valid option for max age.`);
	return num;
};
