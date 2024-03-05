import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { Validate, promptValidator } from "../utils/validator.js";
import { generateChatCompletion, getChatHistory, deleteChatHistory } from "../controllers/chat-controller.js";
// Protected Routes
const chatRouter = Router();
chatRouter.post("/new", Validate(promptValidator), verifyToken, generateChatCompletion);
chatRouter.get("/history", verifyToken, getChatHistory);
chatRouter.delete("/clear", verifyToken, deleteChatHistory);
export default chatRouter;
//# sourceMappingURL=chats-routes.js.map