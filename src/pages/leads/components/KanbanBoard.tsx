import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { UpdateLeadCategory, getLeads } from "@/shared/services/LeadsService";
import { LeadsI, LeadItem } from "@/shared/types/types";
import { Button } from "@/components/ui/button";

function getStatusText(status: number) {
  switch (status) {
    case 1:
      return "Em Negociação";
    case 2:
      return "Sem Resposta";
    case 3:
      return "Venda";
    case 4:
      return "Perda";

    default:
      return "Status Desconhecido";
  }
}

function getStatusColor(status: number) {
  switch (status) {
    case 1:
      return "text-blue-500";
    case 2:
      return "text-black-500";
    case 3:
      return "text-green-500";
    case 4:
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export const KanbanBoard: React.FC = () => {
  const [leads, setLeads] = useState<LeadsI[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LeadItem>(null);

  const showDialog = (item: LeadItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedItem(null);
    setDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadsData = await getLeads();
        setLeads(leadsData || []);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchData();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.source && result.destination) {
      const updatedLeads = [...leads];

      const sourceLead = updatedLeads.find(
        (lead) => lead.name === result.source.droppableId
      );
      const destinationLead = updatedLeads.find(
        (lead) => lead.name === result.destination?.droppableId
      );

      const dragItem = sourceLead?.items[result.source.index];

      sourceLead?.items.splice(result.source.index, 1);
      destinationLead?.items.splice(result.destination.index, 0, dragItem);

      setLeads(updatedLeads);

      if (
        sourceLead &&
        destinationLead &&
        sourceLead.name !== destinationLead.name
      ) {
        const leadIdToUpdate = dragItem ? dragItem.id : undefined;
        const newCategory = destinationLead.name;
        await UpdateLeadCategory(leadIdToUpdate, newCategory);
      }
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-semibold mb-2 text-blue-500 text-xl">
              Detalhes do Lead
            </DialogTitle>
            <DialogDescription className="text-blue-500 text-base">
              Confira os detalhes do lead
            </DialogDescription>
          </DialogHeader>
          <div className="items-center justify-center flex">
            <button className="rounded-full bg-white p-2 border-2 border-blue-500 hover:bg-blue-500 hover:text-white mr-3 duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-[19px] h-[19px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
            <button className="rounded-full bg-white p-2 border-2 border-black hover:bg-black hover:text-white duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-[19px] h-[19px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6">
            {selectedItem && (
              <>
                <div className="flex">
                  <span className="text-base mr-7 mb-2">
                    Data:{" "}
                    <span className="text-base font-semibold text-blue-500 ml-1">
                      {new Date(selectedItem.data).toLocaleDateString()}
                    </span>
                  </span>
                </div>
                <span className="text-base mr-7">
                  Nome: {""}
                  <span className="ml-1 text-base font-semibold text-blue-500 w-24">
                    {selectedItem.name}
                  </span>
                </span>
                <span className="text-base mr-7">
                  Origem:{" "}
                  <span className="ml-1 text-base font-semibold text-blue-500">
                    {selectedItem.origem}
                  </span>
                </span>
                <span className="text-base mr-7">
                  Status:{" "}
                  <span
                    className={`ml-1 text-base font-semibold ${getStatusColor(
                      selectedItem.status
                    )}`}
                  >
                    {getStatusText(selectedItem.status)}
                  </span>
                </span>
                <div className="flex ">
                  <span className="text-base mr-7 mt-2">
                    Contato do Lead:{" "}
                    <span
                      className={`ml-1 text-base font-semibold text-blue-500 `}
                    >
                      {selectedItem.contato}
                    </span>
                  </span>
                </div>
              </>
            )}
            <div className="p-3 bg-zinc-300 rounded-lg mt-3 h-20"></div>
          </div>
          <DialogFooter>
            <Button type="button" className="bg-blue-500 text-white hover:bg-blue-700" onClick={closeDialog}>
              Fechar
            </Button>
            <Button type="submit" className="bg-green-600 text hover:bg-green-800">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-auto w-full bg-slate-300 rounded-lg mt-12 flex shadow-lg overflow-x-auto mb-5">
          {leads.map((lead) => (
            <div
              className="bg-blue-600 min-w-[23rem] min-h-[45rem] rounded-md p-3 ml-4 mr-5 h-auto w-auto mb-4 mt-7 shadow-lg"
              key={lead.name}
            >
              <Droppable droppableId={lead.name} key={lead.name}>
                {(provided, _snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <span
                      className={`flex items-center text-base font-semibold mt-2 ml-2 bg-blue-800 p-3 mb-5 rounded-md text-center mr-3 text-white`}
                    >
                      <span className="w-14 h-8 border-2 bg-blue-500 rounded-full mr-3 text-white">
                        {lead.items.length}
                      </span>
                      {lead.name}
                    </span>
                    {lead.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided, _snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-zinc-200 rounded-md p-3 ml-2 h-auto w-1/1 mb-2 mr-4 mt-5 shadow-lg`}
                            onClick={() => showDialog(item)}
                          >
                            <div className="flex flex-col space-y-3">
                              <span className="text-base font-semibold">
                                {item.name}
                              </span>
                              <span>{item.contato}</span>
                              <span>{item.email}</span>
                              <span>{item.origem}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;
