import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { checkAuthStatus, loginUser } from "../helper/api-communicator";

type User = {
    name: string;
    email: string;
}
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;

    login: (email: string, password: string) => Promise<void>;
    signup: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // check if user is logged in (check if cookie token is valid)
        // if yes, set user and isLoggedIn to true
        // else, set user and isLoggedIn to false

        async function checkAuth() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ name: data.name, email: data.email });
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        }
        checkAuth();
    }, []);


    const login = async (email: string, password: string) => {
        // send a request to backend to login
        // if successful, set user and isLoggedIn to true
        // else, set user and isLoggedIn to false
        const data = await loginUser(email, password);
        if (data) {
            setUser({ name: data.name, email: data.email });
            setIsLoggedIn(true);
        } else {
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const signup = async (firstname: string, lastname: string, email: string, password: string) => {
        // send a request to backend to signup
        // if successful, set user and isLoggedIn to true
        // else, set user and isLoggedIn to false
        console.log(firstname, lastname, email, password);
    };

    const logout = async () => {
        // send a request to backend to logout
        // if successful, set user and isLoggedIn to false
        // else, set user and isLoggedIn to true
    };

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

