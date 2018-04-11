declare module 'http-nextra' {

	import {
		Server,
		IncomingMessage,
		ServerResponse,
	} from 'http';

	export type MethodsHandler<T = {}> = (request: IncomingMessage, response: ServerResponse, params?: T) => void;

	export class APIServer extends Server {
		constructor(requestListener?: (req: IncomingMessage, res: ServerResponse) => void);

		public router: Router;
	}

	export class Router {
		constructor(server: APIServer, path: string);

		public server: APIServer;
		public paths: Array<Router | Piece>;
		private _onAll: Function;
		private _variable: boolean;
		public path: string;

		public add(name: string, method?: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		private isPath<T = {}>(parts: string[], request: IncomingMessage, response: ServerResponse, options: T): any;
		private runPath<T = {}>(parts: string[], request: IncomingMessage, response: ServerResponse, options: T): any;

		public acl(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public bind(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public checkout(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public connect(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public copy(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public delete(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public get(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public head(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public link(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public lock(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public 'm-search'(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public merge(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public mkactivity(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public mkcalendar(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public mkcol(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public move(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public notify(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public options(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public patch(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public post(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public propfind(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public proppatch(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public purge(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public put(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public rebind(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public report(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public search(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public subscribe(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public trace(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public unbind(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public unlink(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public unlock(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		public unsubscribe(name: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
	}

	export class Piece {
		constructor(router: Router, name: string, method: string, condition?: MethodsHandler, callback?: MethodsHandler);

		public type: string;
		private _variable: boolean;
		public name: string;
		public method: string;

		private _condition?: MethodsHandler;
		private _callback: MethodsHandler;

		public run<T = {}>(request: IncomingMessage, response: ServerResponse, options: T): Promise<void>;
		public isPath<T = {}>(parts: string[], request: IncomingMessage, response: ServerResponse, options: T): (this|false)
	}

}