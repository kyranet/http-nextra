const { ServerResponse } = require('http');
const { readFileSync } = require('fs');

class ResponseNextra extends ServerResponse {

	constructor(...args) {
		super(...args);

		this.contentType = null;
	}

	end(data) {
		this.server.headers['Content-Type'] = this.contentType;
		this.writeHead(200, this.server.headers);
		super.end(data);
	}

	send(str) {
		this.contentType = MIMETYPES.default;
		this.end(str);
	}

	sendFile(path) {
		const data = readFileSync(path);
		this.contentType = MIMETYPES[path.substr(path.lastIndexOf('.'))];
		this.end(data);
	}

	json(obj) {
		this.contentType = MIMETYPES['.json'];
		this.end(JSON.stringify(obj));
	}

	image(buffer, type = 'png') {
		this.contentType = MIMETYPES[`.${type}`];
		this.end(buffer);
	}

	redirect(path) {
		this.writeHead(303, { Location: `http://${this.request.headers.host}${path}` });
		super.end();
	}

}

const MIMETYPES = {
	default: 'text/plain',
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.jpg': 'image/jpeg',
	'.png': 'image/png',
	'.ico': 'image/x-icon'
};

module.exports = ResponseNextra;
