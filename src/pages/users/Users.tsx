import { Button } from "@/components/ui/button";
import Sidebar from "../home/components/Sidebar";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import UserTable from "./components/userTable";

export const Users = () => {
    useEffect(() => {
        document.title = "Usuários | Tecnoponto"
     }, []);
  return (
    <Sidebar>
      <div className="flex flex-col w-full">
        <span className="text-xl font-semibold px-2 pt-5 ml-5 mt-12">
          Usuários
        </span>
                
        <div className="flex -mt-14 justify-end items-end p-5 w-full">
         <Button className="bg-blue-600 hover:bg-blue-800 hover:text-white text-white border-none mr-3">
            <PlusIcon className="w-5 h-5 mr-3"/>
            <span>Novo Usuario </span>
         </Button>
        </div>
        <UserTable/>

      </div>
    </Sidebar>
  );
};

export default Users;
