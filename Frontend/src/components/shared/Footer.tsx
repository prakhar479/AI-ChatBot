import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            backgroundColor: '#1F1F1F',
            padding: '10px',
            textAlign: 'center'
        }}>
            <p style={{
                fontSize: '14px',
                color: '#888'
            }}>
                <span style={{
                    color: '#09F7FF',
                    fontSize: '56px'
                }}>

                    2024 MERN-AI CHATBOT V1.0
                </span>
                <br />
                With Love from Prakhar Singhal
                <br />
                <a href="https://github.com/legend479" target="_blank" rel="noopener noreferrer">
                    <img src="github.jpeg" style={{
                        height: '4vw',
                        borderRadius: '30%',
                        padding: '1em'
                    }} />
                </a>
                <a href="https://www.linkedin.com/in/prakhar-singhal-a9437b26b/" target="_blank" rel="noopener noreferrer">
                    <img src="linkdin.png" style={{
                        height: '4vw',
                        borderRadius: '30%',
                        padding: '1em'
                    }} />
                </a>
                <a href="https://www.instagram.com/prakhar_2218/" target="_blank" rel="noopener noreferrer">
                    <img src="insta.jpeg" style={{
                        height: '4vw',
                        borderRadius: '30%',
                        padding: '1em'
                    }} />
                </a>
            </p>
        </footer>
    );
};

export default Footer;