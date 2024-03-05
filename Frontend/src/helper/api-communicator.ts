import axios from "axios"

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/user/login", { email, password })
    if (response.status === 200) {
      return response.data;
    }
    else {
      throw new Error("Error logging in");
    }
};

export const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status")
    if (response.status === 200) {
      return response.data;
    }
    else {
      throw new Error("Unable to check auth status");
    }
};

export const sendChatRequest = async (message: string) => {

  const response = await axios.post("/chats/new", { prompt: message })
    if (response.status === 200) {
      return response.data;
    }
    else {
      throw new Error("Error sending chat request");
    }
};

export const getChatHistory = async () => {
  const response = await axios.get("/chats/history")
    if (response.status === 200) {
      return response.data;
    }
    else {
      throw new Error("Error getting chat history");
    }
};