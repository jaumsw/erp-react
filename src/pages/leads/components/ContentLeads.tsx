import { AuthContext } from "@/shared/contexts/AuthContext";
import { useContext } from "react";
import { KanbanBoard } from "./KanbanBoard";
import FilterAndSearch from "./FilterAndSearch";
export const ContentLeads = () => { 
    const { user } = useContext(AuthContext);
    
  return (
    <div className="ml-6 mt-16 min-w-[20rem] pr-4">
      <span className="text-xl font-semibold px-2 pt-5">
        Olá, <span>{user?.fullname}</span>
      </span>
      <div className="flex">
      <span className="text-sm font-semibold text-zinc-500 px-2 pt-3">
          Um ótimo dia para você!!
        </span>
      </div>
      <FilterAndSearch/>
      <div className="flex h-auto">    
      <KanbanBoard/>
      </div>
    </div>
  );
};

export default ContentLeads;
