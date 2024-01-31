import { createContext, ReactNode, useEffect, useState} from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import axios from "axios";

interface AuthenticateInterface {
    email: string;
    password: string;
}

interface AuthContextProps {
   signOutUser: () => void;
   user: string | null;
   isAuthenticated: boolean;
   authenticateUser: ({email, password}: AuthenticateInterface) => Promise<{ success: boolean, message: string }>;
}


export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {

	const [user, setUser] = useState< | null>(null);

    const isAuthenticated = !!user;

  
    const authenticateUser = async ({email, password}: AuthenticateInterface) => {
            const response = await axios.post("http://localhost:8999/auth", {
                username: email,
                password: password,
            });
      
            if (response.status === 200) {
                const token = response.data.token;
                const user = response.data.user.username;
    
                setCookie(null, "token", token, {
                    maxAge: 60 * 60 * 1 // 1 hour
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
        window.location.reload();
    }
	return (
		<AuthContext.Provider value={{ user, isAuthenticated, authenticateUser, signOutUser }}>
			{children}
		</AuthContext.Provider>
	);
}
