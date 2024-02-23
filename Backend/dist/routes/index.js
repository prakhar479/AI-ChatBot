import { Router } from "express";
import userRouter from "./user-routes.js";
import chatRouter from "./chats-routes.js";
const router = Router();
router.use("/user", userRouter); // domain/api/v1/user
router.use("/chats", chatRouter); // domain/api/v1/chats
export default router;
//# sourceMappingURL=index.js.map