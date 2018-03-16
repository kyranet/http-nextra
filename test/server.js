const { APIServer } = require('../index');

const server = new APIServer(undefined, async (request, response) => {
	if (!await server.router.runPath(request.url.slice(1).split('/'), request, response, {})) {
		response.end('Hello!');
	}
});

server.listen('5000', (error) => {
	if (error) console.error('Something happened: ', error);
	else console.log('Server is up!');
});

server.router.get('api/guilds/:guild/members/:member', (request, response, { guild, member }) => {
	response.end(`The selected guild is: ${guild}, and member is: ${member}`);
});

server.router.get('json', (request, response) => {
	response.json({
		test: true,
		name: 'HTTP-NEXTRA',
		time: 15,
		info: {
			cool: true,
			id: 'fkdlfkdsl',
			age: 890
		}
	});
});

server.router.get('redirect', (request, response) => {
	response.redirect('/json');
});
