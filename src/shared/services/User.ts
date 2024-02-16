import { parseCookies } from "nookies";
import axios from 'axios';

export const getUsers = async () => {
    try {
        const { token } = parseCookies();
        if(!token) {
            console.error('Token não encontrado');
            return;
        }
        const response = await axios.get('http://localhost:8099/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        return data.users;
    } catch (error) {
        console.error('Error getting users:', error);
    }
}