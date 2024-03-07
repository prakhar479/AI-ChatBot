import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <div
            style={{
                display: "flex",
                marginRight: "auto",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem",
            }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <img src="logo.svg" alt="logo" className='image-inverted'
                    style={{
                        height: "5rem", 
                        width: "5rem",
                        
                    }} />
            </Link>
            < Typography
                sx={{
                    flexGrow: 1,
                    display: { md: "block", sm: "none", xs: "none" },
                    mr: "auto",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                    textShadow: "0.1rem 0.1rem 0.1rem black",
                }}>
                <span
                    style={{
                        fontSize: "2.5rem",
                        textShadow: "0.1rem 0.1rem 0.1rem black",
                    }}>
                    MERN
                </span>-GPT
            </Typography>
        </div >
    )
}

export default Logo