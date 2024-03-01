import user from "../models/user.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const generateChatCompletion = async (req, res, next) => {
    const { prompt } = req.body;
    try {
        const User = await user.findById(res.locals.jwtAuth.id);
        if (!User)
            return res.status(401).json({ message: "User not Registered or Token Malfunction" });
        // grab chats from user for context and get in format for Google Gen AI
        // const context = User.chats.map(({ role, content }) => ({ role, content }));
        // context.push({ role: "user", content: prompt });
        User.chats.push({ role: "user", content: prompt });
        // const config = configureOpenAI();
        // const OpenAI = new OpenAIApi(config);
        // const chatReponse = await OpenAI.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: context,
        // });
        const googleGenAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_API_KEY);
        const model = googleGenAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const chatReponse = result.response.text();
        User.chats.push({ role: "model", content: chatReponse });
        await User.save();
        return res.status(200).json({ chats: User.chats });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const generateChatCompletionTest = async (req, res, next) => {
    console.log("Test Route");
    // const { prompt } = req.body;
    const prompt = "Why is the sky blue?";
    console.log("Prompt: ", prompt);
    try {
        // const User = await user.findById(res.locals.jwtAuth.id);
        // if (!User) return res.status(401).json({ message: "User not Registered or Token Malfunction" });
        // grab chats from user for context and get in format for Google Gen AI
        // const context = User.chats.map(({ role, content }) => ({ role, content }));
        // context.push({ role: "user", content: prompt });
        // User.chats.push({ role: "user", content: prompt });
        // const config = configureOpenAI();
        // const OpenAI = new OpenAIApi(config);
        // const chatReponse = await OpenAI.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: context,
        // });
        const googleGenAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_API_KEY);
        const model = googleGenAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const chatReponse = result.response.text();
        // User.chats.push({ role: "model", content: chatReponse });
        // await User.save();
        return res.status(200).json({ response: chatReponse });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};
//# sourceMappingURL=chat-controller.js.map