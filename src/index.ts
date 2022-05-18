import { IncomingMessage, ServerResponse } from "http";
import { AppRouter } from "./app/app.router.js";
import { Application } from "./app/application.js";

console.clear();
const router: AppRouter = AppRouter.createAppRouter()
router.get("/test", (req: IncomingMessage, res: ServerResponse) => {
    return res.end("test page");
})
router.get("/", (req: IncomingMessage, res: ServerResponse) => {
    return res.end("main page");
})
const app: Application = Application.createApplication();
app.addRouter(router);
app.listen(
    Number(process.env.PORT),
    (): void => {
        console.log(`Server is running on port: ${process.env.PORT}...`)
    }
)
console.log("here");