import Sidebar from "@/pages/home/components/Sidebar";
import ContentLeads from "./components/ContentLeads";
import { useEffect } from "react";

export const Leads = () => {
    useEffect(() => {
        document.title = "Leads | Tecnoponto"
     }, []);
         return (
        <Sidebar>
           <ContentLeads />
        </Sidebar>
    )
}

export default Leads;