import {Router} from "express"
import userRouter from "./user-routes.js";
import chatRouter from "./chats-routes.js";

const router = Router();

const test = (req, res, next) => {
    console.log("Test Middleware");
    // console.log("Req: ", req.body);
    next();
}

router.use("/user", userRouter);     // domain/api/v1/user
router.use("/chats", test, chatRouter);    // domain/api/v1/chats


export default router;