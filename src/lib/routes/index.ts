import Users from '../controllers/auth';
import { Application } from 'express';

class Routes {
    public userController: Users = new Users();

    public routes = (app: Application) => {
        app.route('/users').get(this.userController.allUsers);
        app.route('/auth/signup').post(this.userController.userSignup);
        app.route('/auth/login').post(this.userController.login);
    };
}

export default Routes;
