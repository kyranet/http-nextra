const Piece = require('./Piece');
const { METHODS } = require('http');

class Router {

	/**
	 * Constructs a router
	 * @since 0.0.1
	 * @param {APIServer} server The server that manages this router
	 * @param {string} path The path of this router
	 */
	constructor(server, path) {
		/**
		 * @since 0.0.1
		 * @type {APIServer}
		 */
		this.server = server;

		/**
		 * @since 0.0.1
		 * @type {(Router|Piece)[]}
		 */
		this.paths = [];

		/**
		 * @since 0.0.1
		 * @type {?Function}
		 */
		this._onAll = null;

		/**
		 * @since 0.0.1
		 * @type {boolean}
		 */
		this._variable = path.startsWith(':');

		/**
		 * @since 0.0.1
		 * @type {string}
		 */
		this.path = this._variable ? path.slice(1, path.length) : path;
	}

	/**
	 * Add a new path to the router
	 * @since 0.0.1
	 * @param {string} name The name of the new path
	 * @param {string} method The request method to support
	 * @param {Function} [condition] The condition callback
	 * @param {Function} [callback] The callback to run on requests
	 * @returns {this}
	 */
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

	/**
	 * Parse the path
	 * @since 0.0.1
	 * @param {string[]} parts The parts of the path
	 * @param {Request} request The request
	 * @param {Response} response The response
	 * @param {*} options The options
	 * @returns {*}
	 * @private
	 */
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

	/**
	 * Run the path
	 * @since 0.0.1
	 * @param {string[]} parts The parts of the path
	 * @param {Request} request The request
	 * @param {Response} response The response
	 * @param {*} options The options
	 * @returns {*}
	 * @private
	 */
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

// Add all the aliases for better usage
for (const method of METHODS) {
	Object.defineProperty(Router.prototype, method.toLowerCase(), {
		value: function (name, condition, callback) { // eslint-disable-line func-names
			return this.add(name, method, condition, callback);
		}
	});
}

module.exports = Router;
