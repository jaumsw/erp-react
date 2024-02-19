import { DataTable } from "@/components/ui/data-table";
import { columnsTable } from "./columnsTable";
import { useEffect, useState } from "react";
import { getUsers } from "@/shared/services/User";

export const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  });
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columnsTable} data={users} />
    </div>
  );
};

export default UserTable;
