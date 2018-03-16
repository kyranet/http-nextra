const { Server, IncomingMessage, ServerResponse } = require('http');
const Router = require('./Router/Router');
const ResponseNextra = require('./ResponseNextra');

ServerResponse.prototype = new ResponseNextra(IncomingMessage);

class APIServer extends Server {

	constructor(options = {}, listener) {
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

		this.options = options;
	}

}

module.exports = APIServer;
