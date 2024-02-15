import { createContext, ReactNode, useEffect, useState} from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import axios from "axios";
import { recoverUserInformation } from "../services/Auth";

interface AuthenticateInterface {
    email: string;
    password: string;
}

interface User {
    username: string;
    email: string;
    fullname: string;
    isAdmin: boolean;
}

interface AuthContextProps {
   signOutUser: () => void;
   user: User | null;
   isAuthenticated: boolean;
   isAdmin: boolean;
   authenticateUser: ({email, password}: AuthenticateInterface) => Promise<{ success: boolean, message: string }>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
    const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

	const [user, setUser] = useState< User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const isAuthenticated = !!user;

    useEffect(() => {
        const { token } = parseCookies();
        if(token){
            recoverUserInformation(token).then(response => {
                setUser(response);
                if(response.admin === 0){
                    setIsAdmin(true);
                }else{
                    setIsAdmin(false);
                }
            })
        }
    },[])
  
    const authenticateUser = async ({email, password}: AuthenticateInterface) => {

        await delay(1000);
        
        const response = await axios.post("http://localhost:8099/api/auth", {
            email: email,
            password: password,
        });
      
            if (response.status === 200) {
                const token = response.data.token;
                const user = response.data.user.username;
                const admin = response.data.user.admin;

                if(admin === 0 ){
                    setIsAdmin(true);
                }
                else{
                    setIsAdmin(false);
                }
                setCookie(null, "token", token, {
                    maxAge: 60 * 60 * 1 
                })
                
                setUser(user);
                return { success: true, message: "Authentication successful" };
            }
            else{
                return { success: false, message: "Authentication failed" };
            }
    };

    const signOutUser = async ( ) => {
        setUser(null);
        destroyCookie(null, 'token');
        setIsAdmin(false)
        window.location.reload();
    }
	return (
		<AuthContext.Provider value={{ user, isAdmin, isAuthenticated, authenticateUser, signOutUser }}>
			{children}
		</AuthContext.Provider>
	);
}
