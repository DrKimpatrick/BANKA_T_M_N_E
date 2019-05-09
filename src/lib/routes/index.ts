import Users from '../controllers/auth';
import { Application } from 'express';

class Routes {
    public userController: Users = new Users();

    public routes = (app: Application) => {
        app.route('/').get((req, res) => {
            res.status(200).json({
                status: 200,
                data: {
                    lastName: 'Kim',
                    firstName: 'Pat',
                    age: 20,
                },
            });
        });
    };
}

export default Routes;
