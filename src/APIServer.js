const { Server } = require('http');
const Router = require('./Router/Router');

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
