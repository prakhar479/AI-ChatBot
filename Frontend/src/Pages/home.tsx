import { Box, useMediaQuery, useTheme } from '@mui/material';
import TypeAnim from '../components/shared/TypingAnim';
import Footer from '../components/shared/Footer';

export const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Box width={'100%'} height={'100%'} flex={"flex"} mx={'auto'}>
        <Box sx={{
          display: 'flex',
          width: "100%",
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Box >
            <TypeAnim />
          </Box>

          <Box sx={{
            width: "100%",
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            my: 3,
          }}>

            <img src="robot.png" alt="robot" style={{
              width: "10vw",
              borderRadius: "50%",
              boxShadow: "0 0 10px 5px #000000",
              backgroundColor: "white",
              padding: "7px",
              border: "5px solid #000000",
              margin: "auto"
            }} />

            <img src="gemini.png" alt="robot" className="color-change" style={{
              width: "7vw",
              padding: "7px",
              margin: "auto"
            }} />

            <img src="logo.svg" alt="robot" className='image-inverted rotate' style={{
              width: "10vw",
              padding: "7px",
              margin: "auto"
            }} />

          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            mx: 'auto',
          }}>
            <img src='chats.png' alt='chats' className='chat' style={{
              display: 'flex',
              width: isBelowMd ? "100%" : "80%",
              margin: "auto",
              borderRadius: 30,
              boxShadow: "-5px -5px 90px #09F7FF",
              marginBottom: 50,
              marginTop: 50
            }} />
          </Box>

        </Box>
      </Box>
      < Footer />
    </>
  )
}

export default Home;
