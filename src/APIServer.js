const { Server } = require('http');
const Router = require('./Router/Router');

class APIServer extends Server {

	constructor(...args) {
		super(...args);
		this.router = new Router(this, '/');
	}

}
