import { IncomingMessage, ServerResponse } from "http";

export interface IEndPoint {
    [endPoint: string]: IMethods
}
export interface IMethods {
    GET: EndPoinHandler;
    POST: EndPoinHandler;
    DELETE: EndPoinHandler;
    PUT: EndPoinHandler;
}
export type EndPoinHandler = (req: IncomingMessage, res: ServerResponse) => void

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";