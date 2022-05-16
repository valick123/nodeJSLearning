import { EndPoinHandler, HttpMethod, IEndPoint, IMethods } from "./app.type.js";

export class AppRouter {
    protected static instanse: AppRouter | null = null;
    protected endPoints: IEndPoint = {};
    private constructor() { }
    public setEndPoint(path: string, method: HttpMethod, handler: EndPoinHandler): void {
        if (!this.endPoints[path]) {
            this.endPoints[path] = {} as IMethods;
        }
        let endPoint: IMethods = this.endPoints[path];
        if (endPoint[method]) {
            throw new Error(`handler for ${method} of endpoint ${path} already exists!`);
        }
        else {
            endPoint[method] = handler;
        }

    }
    public get(path: string, handler: EndPoinHandler): void {
        this.setEndPoint(path, "GET", handler);
    }
    public post(path: string, handler: EndPoinHandler): void {
        this.setEndPoint(path, "POST", handler);
    }
    public put(path: string, handler: EndPoinHandler): void {
        this.setEndPoint(path, "PUT", handler);
    }
    public delete(path: string, handler: EndPoinHandler): void {
        this.setEndPoint(path, "DELETE", handler);
    }
    public getAllEndPoints(): IEndPoint {
        return this.endPoints;
    }
    public static createAppRouter(): AppRouter {
        if (this.instanse === null) {
            this.instanse = new AppRouter();
        }
        return this.instanse;
    }
}