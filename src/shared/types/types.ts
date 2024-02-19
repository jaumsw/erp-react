export interface LeadItem {
  id: number;
  name: string;
  email: string;
  data: string;
  contato: string;
  origem: string;
  consultor: string;
  status: number;
}

export interface LeadsI {
  name: string;
  items: LeadItem[];
}