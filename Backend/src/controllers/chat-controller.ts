import { Request, Response, NextFunction, response } from "express";
import { param } from "express-validator";
import user from "../models/user.js";
import { configureOpenAI } from "../config/openai-config.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const prompt = req.body.prompt;
    try {
        const User = await user.findById(res.locals.jwtAuth.id);
        if (!User) return res.status(401).json({ message: "User not Registered or Token Malfunction" });


        // const config = configureOpenAI();
        // const OpenAI = new OpenAIApi(config);
        // const chatReponse = await OpenAI.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: context,
        // });


        const googleGenAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_API_KEY);
        const model = googleGenAI.getGenerativeModel({ model: "gemini-pro" });

        // grab chats from user for context and get in format for Google Gen AI
        const chat = model.startChat({
            history: User.chats.map((chat) => ({ role: chat.role, parts: chat.content })),
        });

        const result = await chat.sendMessage(prompt);

        // const result = await model.generateContent(prompt);

        const chatReponse = result.response.text();

        // console.log("Chat Response: ", chatReponse);

        // Verify the response and save it to the user's chat history
        if (!chatReponse) return res.status(500).json({ message: "Server Error" });


        User.chats.push({ role: "user", content: prompt });
        User.chats.push({ role: "model", content: chatReponse });

        await User.save();
        return res.status(200).json({ body: chatReponse });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getChatHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const User = await user.findById(res.locals.jwtAuth.id);
        if (!User) return res.status(401).json({ message: "User not Registered or Token Malfunction" });

        return res.status(200).json({ chats: User.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteChatHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {};
