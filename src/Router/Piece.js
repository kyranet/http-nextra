class Piece {

	constructor(router, name, method, condition, callback) {
		this.type = 'Piece';
		this._variable = name.startsWith(':');
		this.name = this._variable ? name.slice(1, name.length) : name;
		this.method = method;
		this._condition = condition;
		this._callback = callback;
		this._router = router;
	}

	async run(request, response, options) {
		const shouldRun = this._condition ?
			await this._condition(request, response, options) :
			true;

		if (shouldRun) this._callback(request, response, options);
		else if (this._onInhibit) this._onInhibit(request, response, options);
		else response.end();
	}

	isPath(parts, request, response, options) {
		if (request.method !== this.method || parts.length > 1) return false;
		if (this._variable) [options[this.name]] = parts;
		return this.name === parts[0] || this._variable ? this : false;
	}

}

module.exports = Piece;
