const { ServerResponse } = require('http');
const { readFileSync } = require('fs');

class ResponseNextra extends ServerResponse {

	send(data) {
		this.setHeader('Content-Type', MIMETYPES.default);
		this.end(data);
	}

	sendFile(path) {
		const data = readFileSync(path);
		this.setHeader('Content-Type', MIMETYPES[path.substr(path.lastIndexOf('.'))]);
		this.end(data);
	}

	json(obj) {
		this.setHeader('Content-Type', MIMETYPES['.json']);
		this.end(JSON.stringify(obj));
	}

	image(buffer, type = 'png') {
		this.setHeader('Content-Type', MIMETYPES[`.${type}`]);
		this.end(buffer);
	}

	redirect(path) {
		this.writeHead(303, { Location: `http://${this.request.headers.host}${path}` });
		this.end();
	}

}

const MIMETYPES = {
	default: 'text/plain',
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.jpg': 'image/jpeg',
	'.png': 'image/png'
};

module.exports = ResponseNextra;
