import express from 'express';
import Routes from './routes';
import mongoose from 'mongoose';

class App {
    public app: express.Application;
    public authRoutes: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost/banka1';

    public constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.authRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, { useCreateIndex: true, useNewUrlParser: true });
    }
}

export default new App().app;
