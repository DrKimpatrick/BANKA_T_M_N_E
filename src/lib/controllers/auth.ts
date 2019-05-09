import UserModel from '../models';
import { Request, Response } from 'express';

class Users {
    public userSignup = (req: Request, res: Response) => {
        const newUser = new UserModel(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).send(err);
            }
            return res.status(201).json(user);
        });
    };

    public allUsers = (req: Request, res: Response) => {
        UserModel.find({}, (err, users) => {
            if (err) {
                return res.send(err);
            }
            res.status(200).json({
                status: 200,
                data: users,
            });
        });
    };
}

export default Users;
