import {
    ShoppingCartIcon,
    CheckIcon,
    DocumentCheckIcon,
    XMarkIcon,
    UserGroupIcon,
  } from "@heroicons/react/24/outline";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { useState, useContext } from "react";
  import { Button } from "@/components/ui/button";
  import { addDays, format } from "date-fns";
  import { Calendar } from "@/components/ui/calendar";
  import { CalendarIcon } from "@radix-ui/react-icons";
  import { DateRange } from "react-day-picker";
  import { AuthContext } from "@/shared/contexts/AuthContext";
  
  const ContentHome = () => {
    const { user, isAdmin } = useContext(AuthContext);
    const [date, setDate] = useState<DateRange | undefined>({
      from: new Date(2024, 0, 20),
      to: addDays(new Date(2024, 0, 20), 20),
    });
  
    return (
      <div className="ml-6 mt-16 w-full pr-4">
        <span className="text-xl font-semibold px-2 pt-5">
          Olá, <span>{user?.fullname}</span>
        </span>
        <div className="flex">
          <span className="text-sm font-semibold text-zinc-500 px-2 pt-3">
            Um ótimo dia para você!!
          </span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="bg-blue-600 hover:bg-blue-800 hover:text-white text-white border-none ml-auto"
                id="date"
                variant={"outline"}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex w-full mt-10">
          <div className="w-1/4 h-40 bg-zinc-100 rounded-xl p-4 mt-4 pr-9 shadow-md mr-4">
            <div className="flex mr-3 w-9 h-9 border-2 border-blue-400 rounded-full bg-blue-600 text-white mb-3">
              <ShoppingCartIcon className="h-6 w-6 mt-1 ml-1" />
            </div>
            <span className="text-base font-semibold mt-1">Pedidos</span>
          </div>
          <div className="w-1/4 h-40 bg-zinc-100 rounded-xl p-4 mt-4 pr-9 shadow-md mr-4">
            <div className="flex mr-3 w-9 h-9 border-2 border-blue-400 rounded-full bg-blue-600 text-white mb-3">
              <XMarkIcon className="h-6 w-6 mt-1 ml-1" />
            </div>
            <span className="text-base font-semibold mt-1">
              Pedidos Recusados
            </span>
          </div>
          <div className="w-1/4 h-40 bg-zinc-100 rounded-xl p-4 mt-4 pr-9 shadow-md mr-4">
            <div className="flex mr-3 w-9 h-9 border-2 border-blue-400 rounded-full bg-blue-600 text-white mb-3">
              <CheckIcon className="h-6 w-6 mt-1 ml-1" />
            </div>
            <span className="text-base font-semibold mt-1">Pedidos OK</span>
          </div>
          <div className="w-1/4 h-40 bg-zinc-100 rounded-xl p-4 mt-4 pr-9 shadow-md mr-4">
            <div className="flex mr-3 w-9 h-9 border-2 border-blue-400 rounded-full bg-blue-600 text-white mb-3">
              <UserGroupIcon className="h-6 w-6 mt-1 ml-1" />
            </div>
            <span className="text-base font-semibold">Leads</span>
          </div>
          <div className="w-1/4 h-40 bg-zinc-100 rounded-xl p-4 mt-4 pr-9 shadow-md">
            <div className="flex mr-3 w-9 h-9 border-2 border-blue-400 rounded-full bg-blue-600 text-white mb-3">
              <DocumentCheckIcon className="h-6 w-6 mt-1 ml-1" />
            </div>
            <span className="text-base font-semibold mt-1">Contratos OK</span>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 h-72 flex bg-zinc-100 rounded-xl shadow-md mt-11 mr-9"></div>
          <div className="w-1/2 h-72 flex bg-zinc-100 rounded-xl shadow-md mt-11"></div>
        </div>
        <div className="w-full h-96 flex bg-zinc-100 rounded-xl shadow-md mt-11"></div>
      </div>
    );
  };
  
  export default ContentHome;
  