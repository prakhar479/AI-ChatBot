import Configuration from "openai";

export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_API_KEY,
        organization: process.env.OPEN_AI_API_ORG_ID,
    });
    return config;
};