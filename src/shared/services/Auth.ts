import { setCookie } from 'nookies'
import axios from "axios";

interface AuthenticateInterface {
    email: string;
    password: string;
}

const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const authenticateUser = async ({ email, password }: AuthenticateInterface) => {

    await delay(1000);

    const response = await axios.post("http://localhost:8099/auth", {
        email: email,
        password: password,
    });

    if (response.status === 200) {
        console.log(response.data)
        const token = response.data.token;
        
        setCookie(null, "token", token, {
            maxAge: 60 * 60 * 1
        })

        return { success: true, message: "Authentication successful" };
    }
    else {
        return { success: false, message: "Authentication failed" };
    }
}

export async function recoverUserInformation(token: string) {
    const headers = {
        Authorization: `Bearer ${token}`
    };

    try {
        const response = await axios.get("http://localhost:8999/user", { headers });
        const data = response.data;
        console.log(data);
        return data.user;
    } catch (error) {
        console.error("Erro ao recuperar informações do usuário", error);
        throw error;
    }
}