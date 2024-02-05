import { useState } from "react";
import { HomeIcon, RectangleStackIcon, ShoppingCartIcon,UsersIcon, DocumentTextIcon, PowerIcon } from '@heroicons/react/24/outline';
import ContentHome from "./ContentHome";


const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Home", path: "/home", icon: <HomeIcon className="h-5 w-5" />},
        { title: "Leads", path: "/leads", icon: <UsersIcon className="h-5 w-5" /> },
        { title: "Pedidos", path: "/pedidos", icon: <RectangleStackIcon className="h-5 w-5" />, },
        {
            title: "Produtos",
            icon: <ShoppingCartIcon className="h-5 w-5"/>,
            path: "/",
            submenu: true,
            submenuItems: [
                { title: "Vizualizar Produtos" },
                { title: "Cadastrar Produtos" },
                { title: "Excluir Produtos" },
                { title: "Alterar de Produtos" },
            ]
        },
        { title: "Contratos", path: "/", icon: <DocumentTextIcon className="h-5 w-5"/>,},
    ]

    return (
        <div className="flex bg-zinc-200">
            <nav className={`${open ? "w-72" : "w-20"} h-screen bg-blue-800 relative duration-200 shadow-lg`}>
                <button
                    className={`w-8 h-8 border-2 rounded-full mt-4 ml-auto bg-zinc-100 text-blue-600 hover:text-white hover:bg-blue-500 absolute -right-3 ${!open ? "rotate-180" : ""}`}
                    onClick={() => setOpen(!open)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-1 w-5 h-5 relative">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <div className={`flex items-center ${open ? "w-52" : "w-11"} h-8 bg-blue-900 rounded-md px-2 mt-16 ml-5 transition-all duration-150`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white w-5 h-5 block cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="search"
                        placeholder="Pesquisar"
                        className={`text-base bg-transparent rounded-none ${open ? "w-44" : "hidden"} focus:outline-none focus:ring-0 ml-2 text-white overflow-hidden transition-all`}
                    />
                </div>
                <ul className="pt-2">
                    {Menus.map((menu, index) => (
                        <li key={index} className={`text-sm font-semibold flex items-center gap-x-3 p-4 cursor-pointer hover:bg-blue-700 rounded-md m-4`}>
                            <span className="text-white">
                                {menu.icon}
                            </span>
                            <span className={`text-white ${!open && "hidden"}`}>{menu.title}</span>
                        </li>
                        )
                    )}
                    <li className="text-sm font-semibold flex items-center gap-x-3 p-4 cursor-pointer hover:bg-blue-700 rounded-md m-4 ">
                        <span className="text-white"><PowerIcon className="h-5 w-5"/></span>
                        <span className={`text-white ${!open && "hidden"}`}>Sair</span>
                    </li>
                </ul>
            </nav>
            <ContentHome/>
        </div>
    );
}

export default Sidebar;
