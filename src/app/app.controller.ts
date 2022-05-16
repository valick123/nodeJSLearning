export class AppController {
    protected static instanse: AppController | null = null;

    private constructor() { }


    public static createAppController(): AppController {
        if (this.instanse === null) {
            this.instanse = new AppController();
        }
        return this.instanse;
    }
}