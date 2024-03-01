import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
// import React from 'react'
import { useAuth } from '../context/AuthContext';
import { red } from '@mui/material/colors';
import ChatItem from '../components/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useRef, useState } from 'react';

type ChatItem = {
  role: "user" | "model" | "admin",
  content: string
}

export const Chat = () => {
  const auth = useAuth();
  const InputRef = useRef<HTMLInputElement>(null);

  const [chats, setChats] = useState<ChatItem[]>([])
  
  const handleInputSubmit = async () => {
    const prompt = InputRef.current?.value as string;
    // clear the input prompt
    InputRef.current!.value = "";

    const newChat: ChatItem = { role: "user", content: prompt }
    setChats((prev) => [...prev, newChat])

  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputSubmit()
    }
  }
  
  // const chats = [
  //   {
  //     role: "user",
  //     content: "Hello"
  //   },
  //   {
  //     role: "model",
  //     content: "Hello, How can I help you today?"
  //   },
  //   {
  //     role: "user",
  //     content: "What is a Unicorn?"
  //   },
  //   {
  //     role: "model",
  //     content: "A unicorn is a legendary creature that has been described since antiquity as a beast with a single large, pointed, spiraling horn projecting from its forehead."
  //   },
  //   {
  //     role: "user",
  //     content: "What is the capital of India?"
  //   },
  //   {
  //     role: "model",
  //     content: "New Delhi"
  //   },
  //   {
  //     role: "user",
  //     content: "Why is water blue?"
  //   },
  //   {
  //     role: "model",
  //     content: "Water is blue because water absorbs colors in the red part of the light spectrum. Like a filter, this leaves behind colors in the blue part of the light spectrum for us to see."
  //   },
  // ]

  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%', height: "100%", mt: 3, gap: 3 }}>
      <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: 'column'}}>
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          bgcolor: "rgb(25,33,45)",
          borderRadius: 5,
          flexDirection: "column",
          mx: 3,
          p: 1,
          paddingBottom: 5,
        }}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: 'white', color: 'black', fontWeight: 800, p: 1 }}>
            {auth?.user?.name?.charAt(0)}{auth?.user?.name?.split(" ").pop()?.charAt(0)}
          </Avatar>
          <Typography sx={{ mx: "auto", my: 2, color: "white", fontFamily: "work sans" }} variant="h5" style={{ wordWrap: "break-word" }} textAlign="center">
            Hello {auth?.user?.name}<br /> How can I help you today?
          </Typography>
          <Typography sx={{ mx: "auto", my: 2, color: "white", fontFamily: "work sans" }} style={{ wordWrap: "break-word" }} textAlign="left">
            You can ask me anything, I am here to help you. <br />Below are some of the things you can ask me:<br />
            <ul>
              <li>What is a Unicorn?</li>
              <li>What is the capital of India?</li>
              <li>Why is water blue?</li>
            </ul>
            And much more...
          </Typography>

          <Button sx={{
            width: "auto",
            p: 1,
            my: "auto",
            mx: "auto",
            color: "white",
            fontWeight: "700",
            borderRadius: 3,
            bgcolor: red[300],
            ":hover": {
              bgcolor: red[600]
            }
          }}>
            <div style={{ padding: "10px", fontWeight: 700 }}>Clear Conversation</div>
            <img src='trash.svg' alt="" width={"50vw"} />
          </Button>

        </Box>
      </Box>

      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3, alignItems: 'center' }}>
        <Typography sx={{ mx: "auto", mb: 2, color: "white", fontSize: "60px", fontWeight: "600" }} textAlign="center" >
          Model Google-Gemini
        </Typography>
        <Box sx={{
          width: "100%",
          height: "70vh",
          borderRadius: 3,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}>
          {chats.map((chat) => (
            <ChatItem content={chat.content} role={chat.role as "user" | "model" | "admin"} />
          ))}
        </Box>
        <Box>
          <div style={{width:"70vw", padding:"20px", borderRadius: 7, backgroundColor:"rgb(20,30,70)", display:"flex", margin:"auto", }}>
            <input type='text' ref={InputRef} onKeyDown={handleEnter} style={{
              width: "75vw",
              background: "#F0F0F0",
              padding: "5px",
              border: "none",
              outline: "none",
              fontSize: "1.75vh",
              fontWeight: 600,
              fontFamily: 'work-sans',
              borderRadius: 10,
            }} />
            <IconButton sx={{ml:"auto", color:"white"}} onClick={handleInputSubmit} > <IoMdSend size={35}/></IconButton>
          </div>

        </Box>
      </Box>
    </Box>
  )
};

export default Chat;