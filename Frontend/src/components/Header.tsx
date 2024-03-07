import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLinks from './shared/NavigationLinks';

export const Header = () => {
    const auth = useAuth();
    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Logo />
                <div>
                    {auth?.isLoggedIn ? (
                    <>
                        <NavigationLinks
                            bg="#00fffc"
                            to="/chat"
                            text="Go to the chats"
                            textColor='black'
                        />
                        <NavigationLinks
                            bg="#51538f"
                            textColor='white'
                            to="/"
                            text="Logout"
                            onClick={auth.logout}
                        />
                    </>
                    ) : (
                        <>
                            <NavigationLinks
                                bg="#00fffc"
                                textColor='black'
                                to="/login"
                                text="Login"
                            />
                            <NavigationLinks
                                bg="#51538f"
                                textColor='white'
                                to="/signup"
                                text="Signup"
                            />
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;