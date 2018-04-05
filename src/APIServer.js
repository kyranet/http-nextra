const { Server, IncomingMessage, ServerResponse } = require('http');
const Router = require('./Router/Router');
const ResponseNextra = require('./ResponseNextra');
const builders = require('./Util/headerBuilder');
const { DEFAULTS: { HEADERS } } = require('./Util/constants');

ServerResponse.prototype = new ResponseNextra(IncomingMessage);

/**
 * A class that extends http.Server with a built in router for HTTP requests.
 * @extends http.Server
 */
class APIServer extends Server {

	/**
	 * Creates a new HTTP server
	 * @param {Function} listener A listener for HTTP requests. Arguments are `request` and `response`
	 * @param {Object} options Any object
	 */
	constructor(listener, options = {}) {
		super((request, response) => {
			Object.defineProperty(response, 'request', { value: request });
			listener(request, response);
		});

		/**
		 * The main router
		 * @since 0.0.1
		 * @type {Router}
		 */
		this.router = new Router(this, '/');

		/**
		 * Options for this server
		 * @type {Object}
		 */
		this.options = options;

		/**
		 * The HTTP headers to set
		 * @type {Object}
		 */
		this.options.headers = options.headers || HEADERS;

		const { def, ...extras } = this.options.headers;

		if (typeof def === 'boolean' && def) this.rawHeaders = extras ? { ...HEADERS, ...extras } : { ...HEADERS };
		else if (typeof def === 'boolean' && !def) this.rawHeaders = extras ? { ...extras } : { };
		else if (typeof def === 'undefined') this.rawHeaders = extras ? { ...extras } : { ...HEADERS };

		/**
		 * Built HTTP headers from the raw headers option
		 * @type {Object}
		 */
		this.headers = this.buildHeaders(this.rawHeaders);

		Object.defineProperty(ServerResponse.prototype, 'server', { value: this });
	}

	/**
	 * Builds HTTP response headers.
	 * @param {Object} opts The header options for this server
	 * @returns {Object} The built headers.
	 */
	buildHeaders(opts) {
		const ret = {};
		for (const [header, headerOpts] of Object.entries(opts)) {
			const built = builders[header] ? builders[header](headerOpts) : null;
			if (!built) continue;
			ret[header] = built;
		}
		return ret;
	}

}

module.exports = APIServer;
