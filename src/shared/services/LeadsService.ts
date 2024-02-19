import { parseCookies } from 'nookies';
import { LeadsI } from '../types/types';

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

            const categorizedLeads: LeadsI[] = data.leads.reduce((acc : LeadsI[], lead) => {
                const { categoria } = lead;

                const category = acc.find(category => category.name === categoria);
                if (category) {
                    category.items.push({
                        id: lead.id,
                        name: lead.name,
                        email: lead.email,
                        data: lead.data,
                        contato: lead.contato,
                        origem: lead.origem_lead,
                        consultor: lead.consultor,
                        status: lead.status
                    });
                } else {
                    acc.push({
                        name: categoria,
                        items: [{
                            id: lead.id,
                            name: lead.name,
                            email: lead.email,
                            data: lead.data,
                            contato: lead.contato,
                            origem: lead.origem_lead,
                            consultor: lead.consultor,
                            status: lead.status
                        }]
                    });
                }

                return acc;
            }, []);

            return categorizedLeads;
        } else {
            console.error('Failed to fetch leads. Status:', response.status);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

export const UpdateLeadCategory = async (leadId: number, newCategory: string) => {
    try {
        const { token } = parseCookies();
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        const response = await fetch(`http://localhost:8099/api/leads/${leadId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ categoria: newCategory }) 
        });

        console.log(response);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Falha ao atualizar a categoria do lead:', response.status);
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}
