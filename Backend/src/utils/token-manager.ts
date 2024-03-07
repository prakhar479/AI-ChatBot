import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AUTH_COOKIE } from './constants.js';

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = {
        id,
        email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: expiresIn
    });

    return token;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${AUTH_COOKIE}`];
    // console.log(token);
    return new Promise((resolve, reject) => {
        if (!token) {
            // const error = new Error("Unauthorized");
            // reject(error);
            return res.status(401).json({ message: "Unauthorized" });
        }
        jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
            if (err) {
                // const error = new Error("Token Expired");
                // reject(error);
                return res.status(401).json({ message: "Token Expired" });
            } else {
                // console.log("Token verified");
                resolve(decoded);
                res.locals.jwtAuth = decoded;
                return next();
            }
        });
    });
}