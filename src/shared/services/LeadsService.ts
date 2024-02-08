import { parseCookies } from 'nookies';

export const getLeads = async () => {
    try {
        const { token } = parseCookies();

        if (!token) {
            console.error('Token não encontrado');
            return; 
        }

        const response = await fetch('http://localhost:8099/api/leads', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            return data.leads;
        } else {
            console.error('Failed to fetch leads. Status:', response.status);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};
