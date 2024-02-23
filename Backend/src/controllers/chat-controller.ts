import { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import user  from "../models/user.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi , chatCompletionRequestMessage } from "openai";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { prompt } = req.body;
    const User = await user.findById(res.locals.jwtAuth.id);
    if (!User) return res.status(401).json({ message: "User not Registered or Token Malfunction" });

    // grab chats from user for context
    const context = User.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionRequestMessage[];
    context.push({ role: "user", content: prompt });
    User.chats.push({ role: "user", content: prompt });

    const config = configureOpenAI();
    const OpenAI = new OpenAIApi(config);
    const chatReponse = await OpenAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: context,
    });
    
}