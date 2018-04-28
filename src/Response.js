const { ServerResponse } = require('http');
const { createReadStream } = require('fs');
const { DEFAULTS: { MIMETYPES } } = require('./Util/constants');

/**
 * A class that extends http.ServerResponse to add helper methods
 * @extends http.ServerResponse
 */
class Response extends ServerResponse {

	constructor(...args) {
		super(...args);

		/**
		 * The APIServer associated with this response
		 * @type {APIServer}
		 */
		this.server = null;

		/**
		 * The original request that was made
		 * @type {IncomingMessage}
		 */
		this.request = null;
	}

	/**
	 * Sends a plain text message to the body
	 * @param {(string|Buffer)} data Any data that will be sent in the response
	 * @param {string} [mime=.html] The MIMETYPE of the data being sent
	 * @param {Function} [callback] The callback that will be passed to Response.end()
	 * @returns {void}
	 */
	send(data, mime, callback) {
		if (typeof mime === 'undefined' && typeof callback === 'undefined') {
			callback = null;
			mime = '.html';
		} else if (typeof callback === 'undefined' && typeof mime === 'function') {
			callback = mime;
			mime = '.html';
		}

		this.setHeader('Content-Type', MIMETYPES[mime] || 'text/plain');

		if (this.server.headers) this.writeHead(200, { ...this.server.headers });
		else this.writeHead(200);

		return this.end(data, callback);
	}

	/**
	 * Sends a file to the body.
	 * @param {string} path Path to the file
	 */
	sendFile(path) {
		const rstream = createReadStream(path);

		rstream.pipe(this);
	}

	/**
	 * Sends a JSON object to the body
	 * @param {Object} obj An object
	 * @param {Function} [callback] The callback to be passed to Response.end
	 * @returns {void}
	 */
	json(obj, callback) {
		return this.send(JSON.stringify(obj), '.json', callback);
	}

	/**
	 * Sends an image to the body
	 * @param {Buffer} buffer A Buffer of binary data
	 * @param {string} [type=png] The type of the image (png or jpg)
	 * @param {Function} [callback] The callback to be passed to Response.end()
	 * @returns {void}
	 */
	image(buffer, type = 'png', callback) {
		return this.send(buffer, `.${type}`, callback);
	}

	/**
	 * Redirects the page to a given route
	 * @param {string} path A route on the server
	 * @param {number} [status=303] The HTTP status to send
	 * @returns {void}
	 */
	redirect(path, status = 303) {
		this.writeHead(status, { Location: `http://${this.request.headers.host}${path}` });
		return this.end();
	}

}

module.exports = Response;
