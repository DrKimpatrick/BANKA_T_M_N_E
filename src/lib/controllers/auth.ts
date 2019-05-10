/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import UserModel from '../models';
import { Request, Response } from 'express';
// import { verifyToken } from '../middlewere';
const bcrypt = require('bcryptjs');

class Users {
    public userSignup = (req: Request, res: Response) => {
        if (!req.body.password.match(/^(?=.*\d)[0-9a-zA-Z]{8,}$/)) {
            res.status(400).json({
                status: 400,
                error: 'Weak password, must be at least 8 characters and have at least 1 letter and number',
            });
        }

        const password = bcrypt.hashSync(req.body.password, 8);
        const { email, firstName, lastName, username } = req.body;

        const data = {
            email,
            firstName,
            lastName,
            username,
            password,
        };

        const newUser = new UserModel(data);
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

    public login = (req: Request, res: Response) => {
        UserModel.findOne({ email: req.body.email }, (err, user: object) => {
            if (err) {
                return res.send(err);
            }
            res.status(200).json({
                status: 200,
                data: user,
            });
        });
    };
}

export default Users;
