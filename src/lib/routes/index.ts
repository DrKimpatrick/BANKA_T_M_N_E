import Users from '../controllers/auth';
import { Application } from 'express';

class Routes {
    public userController: Users = new Users();

    public routes = (app: Application) => {
        app.route('/')
            .get(this.userController.allUsers)

            .post(this.userController.userSignup);
    };
}

export default Routes;
