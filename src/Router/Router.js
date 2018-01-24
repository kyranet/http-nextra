const Piece = require('./Piece');

class Router {

	constructor(server, path) {
		this.paths = [];
		this._onAll = null;
		this.server = server;
		this._variable = path.startsWith(':');
		this.path = this._variable ? path.slice(1, path.length) : path;
	}

	add(name, method = 'GET', condition, callback) {
		if (typeof callback === 'undefined' && typeof condition === 'function') {
			callback = condition;
			condition = null;
		}
		if (name[0] === '/') name = name.slice(1, name.length);
		const route = name.split('/');
		this.paths.push(route.length > 1 ?
			new Router(this.server, route.shift()).add(route.join('/'), method, condition, callback) :
			new Piece(this, route[0], method, condition, callback));

		return this;
	}

	isPath(parts, request, response, options) {
		if (this.path === parts[0] || this._variable) {
			if (this._variable) [options[this.path]] = parts;
			if (parts.length === 1) {
				if (this._onAll) return this._onAll(request, response, options);
			} else {
				return this.runPath(parts.slice(1, parts.length), request, response, options);
			}
		}
		return null;
	}

	runPath(parts, request, response, options) {
		const piece = this.paths.find(path => path.isPath(parts, request, response, options));
		if (!piece) {
			if (this._onAll) return this._onAll(request, response, options);
			return null;
		}
		if (piece.type === 'Piece') return piece.run(request, response, options);
		return null;
	}

}

module.exports = Router;
