declare module 'http-nextra' {

	import {
		Server,
		IncomingMessage,
		ServerResponse,
	} from 'http';

	export type MethodsHandler<T = {}> = (request: IncomingMessage, response: Response, params?: T) => void;

	export class APIServer extends Server {
		constructor(requestListener?: (req: IncomingMessage, res: Response) => void, options?: APIServerOptions);

		public router: Router;

		public options: APIServerOptions;
		public headers: BuiltHeaders;

		public buildHeaders(opts: HeaderOptions): BuiltHeaders;
	}

	export class Router {
		constructor(server: APIServer, path: string);

		public server: APIServer;
		public paths: Array<Router | Piece>;
		private _onAll: Function;
		private _variable: boolean;
		public path: string;

		public add(name: string, method?: string, condition?: MethodsHandler, callback?: MethodsHandler): this;
		private isPath<T = {}>(parts: string[], request: IncomingMessage, response: Response, options: T): any;
		private runPath<T = {}>(parts: string[], request: IncomingMessage, response: Response, options: T): any;

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

		public run<T = {}>(request: IncomingMessage, response: Response, options: T): Promise<void>;
		public isPath<T = {}>(parts: string[], request: IncomingMessage, response: Response, options: T): (this|false);
	}

	export class Response extends ServerResponse {
		constructor(request: IncomingMessage);

		public request: IncomingMessage;
		public server: APIServer;

		public send(data: (string|Buffer), mime?: string, callback?: () => void): void;
		public sendFile(path: string): void;
		public json<T = {}>(obj: T, callback?: () => void): void;
		public image(buffer: Buffer, type = 'png', callback?: () => void): void;
		public redirect(path: string, status = 303);
		public status(code = 200): this;
	}

	export type APIServerOptions<T = {}> = {
		headers?: HeaderOptions & T;
	};

	export type HeaderOptions = {
		'X-DNS-Prefetch-Control'?: boolean,
		'X-Frame-Options'?: boolean | { action: string, domain?: string },
		'X-Powered-By'?: boolean | string,
		'Strict-Transport-Security'?: {
			maxAge?: number,
			includeSubDomains?: boolean,
			preload?: boolean
		};
		'X-Download-Options'?: boolean,
		'X-XSS-Protection'?: boolean | { reportUri: string },
		'Expect-CT'?: { enforce?: boolean, maxAge: number, reportUri?: string },
		'Cache-Control'?: boolean,
		Expires?: string,
		'Surrogate-Control'?: boolean
	};

	export type BuiltHeaders = {
		'X-DNS-Prefetch-Control'?: string,
		'X-Frame-Options'?: string,
		'X-Powered-By'?: string,
		'Strict-Transport-Security'?: string,
		'X-Download-Options'?: string,
		'X-XSS-Protection'?: string,
		'Expect-CT'?: string,
		'Cache-Control'?: string,
		Expires?: string,
		'Surrogate-Control'?: string
	};

}
