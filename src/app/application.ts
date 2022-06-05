import EventEmitter from "events";
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { AppRouter } from "./app.router.js";
import { EndPoinHandler, IEndPoint, IMethods } from "./app.type.js";

export class Application {
    protected static instanse: Application | null = null;
    protected server: Server;
    protected EventEmitter: EventEmitter;

    private constructor() {
        this.EventEmitter = new EventEmitter()
        this.server = this.createWebServer();
    }
    protected createWebServer(): Server {
        return createServer((req: IncomingMessage, res: ServerResponse) => {
            console.log(this.getEventMask(req.url ?? "", req.method ?? ""))
            const eventResult: boolean = this.EventEmitter.emit(this.getEventMask(req.url ?? "", req.method ?? ""), req, res);
            if (!eventResult) {
                res.end("empty page");
            }
        })
    }
    public addRouter(router: AppRouter): void {
        const endPoints: IEndPoint = router.getAllEndPoints();
        Object.keys(endPoints)
            .forEach((endPointPath: string) => {
                const endPointMethods: IMethods = endPoints[endPointPath];
                Object.keys(endPointMethods)
                    .forEach((methodName: string) => {
                        const handler: EndPoinHandler = (endPointMethods as any)[methodName];
                        this.EventEmitter.on(this.getEventMask(endPointPath, methodName), (req: IncomingMessage, res: ServerResponse) => {
                            handler(req, res);
                        })
                    })
            })
    }
    public listen(port: number, callback: () => void): void {
        this.server.listen(port, callback);
    };
    private getEventMask(url: string, method: string): string {
        return `[${url}]:[${method}]`;
    }
    public static createApplication(): Application {
        if (this.instanse === null) {
            this.instanse = new Application();
        }
        return this.instanse
    }
}