import { Box, Button, Typography } from '@mui/material'
import { BiLogIn } from "react-icons/bi";
import React, { useEffect } from 'react'
import CustomInput from '../components/shared/CustomInput'
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get('email')
    const password = data.get('password')

    // console.log(email, password)
    try {
      toast.loading('Logging in...', { id: 'login' });
      await auth?.login(email as string, password as string)
      toast.success('Logged in successfully!', { id: 'login' });
    } catch (error) {
      console.log(error)
      toast.error("Login Failed!", { id: 'login' });
    }
  }

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate('/chat')
    }
  }, [auth, navigate]);

  return (
    <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
      <Box padding={0} ml={"5vw"} mt={13} display={{ md: "flex", sm: "none", xs: "none" }} paddingLeft={"3em"} >
        <Link to='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
          <img src='login_img.jpg' alt='login_img' width='100%' height='100%' className='login_img' />
        </Link>
      </Box>
      <Box
        width={'fit'}
        display={'flex'}
        flex={{ md: 0.5, sm: 1, xs: 1 }}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        ml={{ md: "20vw", sm: 1, xs: 0 }}
        mt={16}>
        <form className='login_form' onSubmit={handleSubmit}>
          <Box sx={{

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 1,

          }}>
            <Typography variant='h3' fontWeight='bold' padding={3}> Login </Typography>

            <CustomInput type="email" name="email" label='Email' />
            <CustomInput type='password' name='password' label='Password' />

            <Button type='submit' variant='contained' sx={{
              px: 2,
              py: 1,
              fontSize: '1.4em',
              width: '100%',
              marginTop: '1em',
              marginBottom: '1em',
              backgroundColor: '#00fffc',
              color: '#8888',
              '&:hover': {
                backgroundColor: '#bbbb',
                color: '#00fffc',
              }
            }}
              startIcon={<BiLogIn size={30} />}
            >
              <TouchRipple />
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login