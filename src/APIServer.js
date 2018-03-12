const { Server, IncomingMessage, ServerResponse } = require('http');
const Router = require('./Router/Router');
const ResponseNextra = require('./ResponseNextra');

ServerResponse.prototype = new ResponseNextra(IncomingMessage);

class APIServer extends Server {

	constructor(...args) {
		super(...args);

		/**
		 * The main router
		 * @since 0.0.1
		 * @type {Router}
		 */
		this.router = new Router(this, '/');
	}

}

module.exports = APIServer;
