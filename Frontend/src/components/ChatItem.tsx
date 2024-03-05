import { Avatar, Box, Typography } from "@mui/material"
import { useAuth } from "../context/AuthContext";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatItem = ({ content, role }: {
    content: string,
    role: "user" | "model" | "admin"
}) => {
    const auth = useAuth();
    return role === "model" ? (
        <Box sx={{ display: "flex", p: 2, bgcolor: "#49494912", my: 2, gap: 2 }}>
            <Avatar sx={{ ml: "0" }} src="logo.svg" alt="G" />

            <Box>
                <Markdown
                    children={content}
                    components={{
                        code(props) {
                            const { children, className, ...rest } = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <SyntaxHighlighter
                                    {...rest}
                                    PreTag="div"
                                    children={String(children).replace(/\n$/, '')}
                                    language={match[1]}
                                    style={coldarkDark}
                                    ref={null} // Add a null ref to fix the type error
                                />
                            ) : (
                                <code {...rest} className={className}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />

            </Box>
        </Box>
    ) : role === "user" ? (
        <Box sx={{ display: "flex", p: 2, bgcolor: "#00E5FF12", my: 2, gap: 2 }}>
            <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
                {auth?.user?.name?.charAt(0)}{auth?.user?.name?.split(" ").pop()?.charAt(0)}
            </Avatar>
            <Box>
                <Typography color={"white"} fontSize={"20px"}>
                    {content}
                </Typography>
            </Box>
        </Box>
    ) : (
        <></>
    );
};


export default ChatItem