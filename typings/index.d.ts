declare module 'http-nextra' {

	import {
		Server,
		IncomingMessage,
		ServerResponse,
	} from 'http';

	export class APIServer extends Server {
		constructor(requestListener?: (req: IncomingMessage, res: ServerResponse) => void);

		public router: Router;
	}

	export class Router {
		constructor(server: APIServer, path: string);

		public server: APIServer;
		public paths: (Router|Piece)[];
		private _onAll: Function;
		private _variable: boolean;
		public path: string;

		public add(name: string, method?: string, condition?: Function, callback?: Function): this;
		public isPath(parts: string[], request: IncomingMessage, response: ServerResponse, options: any): any;
		public runPath(parts: string[], request: IncomingMessage, response: ServerResponse, options: any): any;

		public acl(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public bind(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public checkout(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public connect(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public copy(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public delete(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public get(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public head(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public link(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public lock(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public 'm-search'(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public merge(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public mkactivity(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public mkcalendar(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public mkcol(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public move(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public notify(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public options(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public patch(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public post(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public propfind(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public proppatch(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public purge(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public put(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public rebind(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public report(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public search(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public subscribe(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public trace(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public unbind(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public unlink(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public unlock(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;
		public unsubscribe(name: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void): this;

	}

	export class Piece {
		constructor(router: Router, name: string, method: string, condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void, callback?: (request: IncomingMessage, response: ServerResponse, options: any) => void);

		public type: string;
		private _variable: boolean;
		public name: string;
		public method: string;

		private _condition?: (request: IncomingMessage, response: ServerResponse, options: any) => void;
		private _callback: (request: IncomingMessage, response: ServerResponse, options: any) => void;

		public run(request: IncomingMessage, response: ServerResponse, options: any): Promise<void>;
		public isPath(parts: string[], request: IncomingMessage, response: ServerResponse, options: any): (this|false)
	}

}