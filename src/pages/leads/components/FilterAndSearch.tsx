import {
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const FilterAndSearch = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Lead</DialogTitle>
            <DialogDescription>
                Adicione todos os dados necessarios para o lead
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="bg-slate-300 h-20 w-full flex rounded-xl mt-4">
        <div
          className={`items-center w-72 h-12 bg-blue-800 rounded-md mt-4 ml-5 transition-all duration-150`}
        >
          <MagnifyingGlassIcon className="w-6 h-6 absolute m-3 text-white block" />
          <input
            type="search"
            placeholder="Pesquisar"
            className={`mt-3 ml-10 text-base bg-transparent rounded-none w-60 focus:outline-none focus:ring-0 text-white overflow-hidden transition-all`}
          ></input>
        </div>
        <Button className="bg-green-600 h-12 flex w-40 rounded-lg m-3 mt-4 ml-auto mr-6 hover:bg-green-800 transition-all duration-150" onClick={handleOpen}>
          <PlusIcon className="w-8 h-8 text-white" />
          <span className="text-white text-base mr-1 ml-4">Novo Lead</span>
        </Button>
      </div>
    </>
  );
};

export default FilterAndSearch;
