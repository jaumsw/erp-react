import { getLeads } from "@/shared/services/LeadsService";
import { LeadsI } from "@/shared/types/types";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const KanbanBoard: React.FC = () => {
  const [leads, setLeads] = useState<LeadsI[]>([]);
  const [clientePotencialLeads, setClientePotencialLeads] = useState<LeadsI[]>(
    []
  );
  const [clienteAtivoLeads, setClienteAtivoLeads] = useState<LeadsI[]>([]);

  /* Contadores */
  const totalLeads = leads.length;
  const totalClientePotencialLeads = clientePotencialLeads.length;
  const totalClienteAtivoLeads = clienteAtivoLeads.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadsData = await getLeads();

        if (Array.isArray(leadsData)) {
          setLeads(leadsData);

          const potencialLeads = leadsData.filter(
            (lead) => lead.categoria === "Cliente em Potencial"
          );
          setClientePotencialLeads(potencialLeads);

          const ativoLeads = leadsData.filter(
            (lead) => lead.categoria === "Cliente Ativo"
          );
          setClienteAtivoLeads(ativoLeads);
        } else {
          console.error("Data received from API is not an array:", leadsData);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-[20rem] w-36 bg-blue-700 rounded-md m-4 text-black flex-grow overflow-y-auto">
        <span className="flex items-center text-base font-semibold mt-2 ml-3 bg-blue-600 p-2 mb-5 rounded-md text-center mr-3 text-white">
          <span className="w-14 h-7 border-2 bg-blue-500 rounded-full mr-3 text-white">
            {totalClientePotencialLeads}
          </span>
          Cliente Em Potencial
        </span>
        {leads.map((lead) => (
          <div
            className="bg-zinc-200 rounded-md p-3 ml-4 h-auto w-64 mb-2 mt-4"
            key={lead.id}
          >
            <div className="flex flex-col space-y-3">
              <span>{lead.name}</span>
              <span>{lead.categoria}</span>
              <span>{lead.data}</span>
              <span>{lead.contato}</span>
            </div>
          </div>
        ))}
      </div>
      
    </>
  );

  //   return (
  //     <div className="h-auto w-full bg-slate-300 rounded-lg mt-11 flex justify-center items-center shadow-lg">

  //       {/* Cliente em Potencial */}
  //       <div className="flex w-full">
  //         <div className="flex flex-col min-h-[20rem] w-1/2 bg-blue-700 rounded-md m-4 text-white flex-grow overflow-y-auto">
  //           {/* Kanban Header */}
  //           <div className="h-auto">
  //             <span className="flex items-center text-base font-semibold mt-2 ml-3 bg-blue-600 p-2 mb-5 rounded-md text-center mr-3">
  //               <span className="w-14 h-7 border-2 bg-blue-500 rounded-full mr-3">
  //                 {totalClientePotencialLeads}
  //               </span>
  //               Cliente Em Potencial
  //             </span>

  //             {/* Kanban Body */}
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //           </div>
  //         </div>

  //         {/* Cliente Ativo */}
  //         <div className="flex flex-col min-h-[20rem] w-1/2 bg-blue-700 rounded-md m-4 text-white flex-grow overflow-y-auto">
  //           {/* Column 2 Header */}
  //           <div className="h-auto">
  //             <span className="flex items-center text-base font-semibold mt-2 ml-3 bg-blue-600 p-2 mb-5 rounded-md text-center mr-3">
  //               <span className="w-14 h-7 border-2 bg-blue-500 rounded-full mr-3">
  //                 {totalClienteAtivoLeads}
  //               </span>
  //               Cliente Ativo
  //             </span>
  //             {/* Column 2 Body */}
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //           </div>
  //         </div>

  //         {/* Em Negociação  */}
  //         <div className="flex flex-col min-h-[20rem] w-1/2 bg-blue-700 rounded-md m-4 text-white flex-grow overflow-y-auto">
  //           {/* Column 2 Header */}
  //           <div className="h-auto">
  //             <span className="flex items-center text-base font-semibold mt-2 ml-3 bg-blue-600 p-2 mb-5 rounded-md text-center mr-3">
  //               <span className="w-14 h-7 border-2 bg-blue-500 rounded-full mr-3">
  //                 {totalClientePotencialLeads}
  //               </span>
  //               Em Negociação
  //             </span>
  //             {/* Column 2 Body */}
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //           </div>
  //         </div>

  //         {/* Possivel Perda  */}
  //         <div className="flex flex-col min-h-[20rem] w-1/2 bg-blue-700 rounded-md m-4 text-white flex-grow overflow-y-auto">
  //           {/* Column 2 Header */}
  //           <div className="h-auto">
  //             <span className="flex items-center text-base font-semibold mt-2 ml-3 bg-blue-600 p-2 mb-5 rounded-md text-center mr-3">
  //               <span className="w-14 h-7 border-2 bg-blue-500 rounded-full mr-3">
  //                 {totalClientePotencialLeads}
  //               </span>
  //               Possível Perda
  //             </span>
  //             {/* Column 2 Body */}
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //           </div>
  //         </div>

  //         {/* Possivel Venda */}
  //         <div className="flex flex-col min-h-[20rem] w-1/2 bg-blue-700 rounded-md m-4 text-white flex-grow overflow-y-auto">
  //           {/* Column 2 Header */}
  //           <div className="h-auto">
  //             <span className="flex items-center text-base font-semibold mt-2 ml-3 bg-blue-600 p-2 mb-5 rounded-md text-center mr-3">
  //               <span className="w-14 h-7 border-2 bg-blue-500 rounded-full mr-3">
  //                 {totalClientePotencialLeads}
  //               </span>
  //               Possível Venda
  //             </span>
  //             {/* Column 2 Body */}
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //             <div className="bg-white rounded-md p-3 ml-4 h-20 w-64 mb-3"></div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default KanbanBoard;
