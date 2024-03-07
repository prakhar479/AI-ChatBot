import { Box, Button, Typography } from '@mui/material'
import { BiLogIn } from "react-icons/bi";
import React, { useEffect } from 'react'
import CustomInput from '../components/shared/CustomInput'
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const first_name = data.get('first_name')
    const last_name = data.get('last_name')
    const email = data.get('email')
    const password = data.get('password')

    // console.log(email, password)
    try {
      toast.loading('Signing in...', { id: 'signup' });
      await auth?.signup(first_name as string, last_name as string, email as string, password as string);
      toast.success('Signed in successfully!', { id: 'signup' });
    } catch (error) {
      console.log(error)
      toast.error("Sign In Failed!", { id: 'signup' });
    }
  }

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate('/chat')
    }
  }, [auth, navigate]);

  return (
    <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
      <Box padding={0} ml={"1vw"} mt={20} display={{ md: "flex", sm: "none", xs: "none" }} paddingLeft={"3em"} >
        <Link to='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
          <img src='signup_img.jpeg' alt='signup_img' width='100%' className='signup_img' />
        </Link>
      </Box>
      <Box
        width={'fit'}
        display={'flex'}
        flex={{ md: 0.5, sm: 1, xs: 1 }}
        justifyContent={'center'}
        alignItems={'center'}
        padding={1}
        ml={{ md: "7vw", sm: 1, xs: 0 }}
        mt={16}>
        <form className='signup_form' onSubmit={handleSubmit}>
          <Box sx={{

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 1,

          }}>
            <Typography variant='h3' fontWeight='bold' padding={3}> SignUp </Typography>

            <CustomInput type="first_name" name="first_name" label='First Name' />
            <CustomInput type="last_name" name="last_name" label='Last Name' />
            <CustomInput type="email" name="email" label='Email' />
            <CustomInput type='password' name='password' label='Password' />

            <Button type='submit' variant='contained' sx={{
              px: 2,
              py: 1,
              fontSize: '1.4em',
              width: '100%',
              marginTop: '1em',
              marginBottom: '1em',
              backgroundColor: '#968BF8',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#777',
                color: '#B4AEEF',
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

export default SignUp;