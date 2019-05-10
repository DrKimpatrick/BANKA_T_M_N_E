/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { Request, Response, NextFunction } = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { SECRETE_KEY } = process.env;
// eslint-disable-next-line consistent-return
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
    if (!token) {
        return res.status(401).json({ status: 401, message: 'No token provided.' });
    }
    // eslint-disable-next-line consistent-return
    jwt.verify(token, SECRETE_KEY, (err: any, decoded: { id: any }) => {
        if (err) {
            return res.status(401).json({ status: 401, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
};

// Generate auth token
export const token = id => {
    const token = jwt.sign({ id }, SECRETE_KEY, { expiresIn: '24h' });

    return token;
};
