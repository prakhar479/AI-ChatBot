import { Router } from "express"
import { verifyToken } from "../utils/token-manager.js";
import { Validate, promptValidator } from "../utils/validator.js";
import { generateChatCompletion } from "../controllers/chat-controller.js";

// Protected Routes
const chatRouter = Router();
chatRouter.get("/new", Validate(promptValidator), verifyToken, generateChatCompletion);

export default chatRouter;