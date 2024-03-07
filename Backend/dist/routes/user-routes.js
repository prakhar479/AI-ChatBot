import { Router } from "express";
import { getAllUsers, UserSignUp, UserLogin, verifyUser, UserLogout } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, Validate } from "../utils/validator.js";
import { verifyToken } from "../utils/token-manager.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", Validate(signupValidator), UserSignUp);
userRouter.post("/login", Validate(loginValidator), UserLogin);
userRouter.get("/logout", verifyToken, verifyUser, UserLogout);
userRouter.get("/auth-status", verifyToken, verifyUser, UserLogin);
export default userRouter;
//# sourceMappingURL=user-routes.js.map