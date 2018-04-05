exports.DEFAULTS = {
	HEADERS: {
		'X-DNS-Prefetch-Control': { allow: false },
		'X-Frame-Options': { action: 'sameorigin' },
		'X-Powered-By': false,
		'Strict-Transport-Security': {
			maxAge: 5184000,
			includeSubDomains: true
		},
		'X-Download-Options': true,
		'X-Content-Type-Options': true,
		'X-XSS-Protection': true
	}
};
