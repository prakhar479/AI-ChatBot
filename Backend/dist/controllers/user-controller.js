import user from "../models/user.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { AUTH_COOKIE, DOMAIN } from "../utils/constants.js";
// Global variable
const saltRounds = 10;
const TimeToExpireToken = "7d";
const TimeToExpireCookie = 7 * 24 * 60 * 60 * 1000;
export const getAllUsers = async (req, res, next) => {
    // get users from db
    try {
        // return users
        const Users = await user.find();
        return res.status(200).json({
            success: true,
            data: Users
        });
    }
    catch (error) {
        console.log(error);
        // return error
        return res.status(500).json({
            error: error.message
        });
    }
};
export const UserSignUp = async (req, res, next) => {
    try {
        // check if user already exists
        const exists = await user.findOne({ email: req.body.email });
        if (exists) {
            return res.status(401).json({
                error: "User already exists"
            });
        }
        // get user info from req.body
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const userInfo = new user({ ...req.body, encry_password: hashedPassword, salt: salt });
        await userInfo.save();
        // clear previous cookie and create token
        res.clearCookie(AUTH_COOKIE, {
            path: "/",
            domain: DOMAIN,
            httpOnly: true,
            signed: true,
            secure: true,
        });
        const token = createToken(userInfo._id.toString(), userInfo.email, TimeToExpireToken);
        res.cookie(AUTH_COOKIE, token, {
            path: "/",
            domain: DOMAIN,
            httpOnly: true,
            signed: true,
            expires: new Date(Date.now() + TimeToExpireCookie),
            secure: true,
        });
        // return user
        return res.status(200).json({
            name: userInfo.firstname + " " + userInfo.lastname,
            email: userInfo.email,
        });
    }
    catch (error) {
        console.log(error);
        // return error
        return res.status(500).json({
            error: error.message
        });
    }
};
export const UserLogin = async (req, res, next) => {
    try {
        // get user info from req.body
        const { email, password } = req.body;
        const userInfo = await user.findOne({ email: email });
        // check if user exists
        if (!userInfo) {
            return res.status(401).json({
                error: "User does not exist"
            });
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(password, userInfo.encry_password);
        if (!validPassword) {
            return res.status(403).json({
                error: "Incorrect password entered"
            });
        }
        // clear previous cookie and create token
        res.clearCookie(AUTH_COOKIE, {
            path: "/",
            domain: DOMAIN,
            httpOnly: true,
            signed: true,
            secure: true,
        });
        const token = createToken(userInfo._id.toString(), userInfo.email, TimeToExpireToken);
        res.cookie(AUTH_COOKIE, token, {
            path: "/",
            domain: DOMAIN,
            httpOnly: true,
            signed: true,
            expires: new Date(Date.now() + TimeToExpireCookie),
            secure: true,
        });
        // return user
        return res.status(200).json({
            name: userInfo.firstname + " " + userInfo.lastname,
            email: userInfo.email,
        });
    }
    catch (error) {
        console.log(error);
        // return error
        return res.status(500).json({
            error: error.message
        });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        // get user 
        const userInfo = await user.findById(res.locals.jwtAuth.id);
        // check if user exists
        if (!userInfo) {
            return res.status(401).json({
                error: "User not registered"
            });
        }
        else if (userInfo.email !== res.locals.jwtAuth.email) {
            return res.status(401).json({
                error: "Permission denied"
            });
        }
        // return user
        return res.status(200).json({
            name: userInfo.firstname + " " + userInfo.lastname,
            email: userInfo.email,
        });
    }
    catch (error) {
        console.log(error);
        // return error
        return res.status(500).json({
            error: error.message
        });
    }
};
//# sourceMappingURL=user-controller.js.map