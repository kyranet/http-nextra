const { ServerResponse } = require('http');
const { createReadStream } = require('fs');
const { extname } = require('path');
const { DEFAULTS: { MIMETYPES } } = require('./Util/constants');


/**
 * A class that extends http.ServerResponse to add helper methods
 * @extends http.ServerResponse
 */
class ResponseNextra extends ServerResponse {

	constructor(...args) {
		super(...args);

		/**
		 * The type of content for the http header `Content-Type`
		 * @type {string}
		 */
		this.contentType = null;
	}

	/**
	 * Sets response headers and sends data to the body
	 * @param {(string|Buffer)} [data] Any data to be sent
	 * @param {string} [encoding] The encoding to use to write the data
	 * @param {Function} [callback] Called when the response stream is finished
	 */
	end(...args) {
		this.server.headers['Content-Type'] = this.contentType || MIMETYPES.default;
		this.writeHead(200, this.server.headers);
		super.end(...args);
	}

	/**
	 * Sends a plain text message to the body
	 * @param {string} str A message
	 */
	send(str) {
		this.contentType = MIMETYPES.default;
		this.end(str);
	}

	/**
	 * Sends a file to the body.
	 * @param {string} path Path to the file
	 */
	sendFile(path) {
		const rstream = createReadStream(path);
		this.contentType = MIMETYPES[extname(path)];
		rstream.pipe(this);
	}

	/**
	 * Sends a JSON object to the body
	 * @param {Object} obj An object
	 */
	json(obj) {
		this.contentType = MIMETYPES['.json'];
		this.end(JSON.stringify(obj));
	}

	/**
	 * Sends an image to the body
	 * @param {Buffer} buffer A Buffer of binary data
	 * @param {string} [type=png] The type of the image (png or jpg)
	 */
	image(buffer, type = 'png') {
		this.contentType = MIMETYPES[`.${type}`];
		this.end(buffer);
	}

	/**
	 * Redirects the page to a given route
	 * @param {string} path A route on the server
	 */
	redirect(path) {
		this.writeHead(303, { Location: `http://${this.request.headers.host}${path}` });
		super.end();
	}

}

module.exports = ResponseNextra;
