import UserModel from '../models';
import { Request, Response } from 'express';

class Users {
    public userSignup = (req: Request, res: Response) => {
        const newUser = new UserModel(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.send(err);
            }
            return res.status(201).json(user);
        });
    };
}

export default Users;
