import { useContext, useEffect, useState } from "react";
import {
  HomeIcon,
  ChevronDownIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
  UsersIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/shared/contexts/AuthContext";

type MenuItem = { title: string; path: string; icon: JSX.Element; submenu?: boolean; submenuItems?: MenuItem[] };

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { signOutUser, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Home");
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: number]: boolean }>(
    {}
  );
  const location = useLocation();


  
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const toggleSubMenu = (menuIndex: number) => {
    setOpenSubMenus((prevOpenSubMenus) => ({
      ...prevOpenSubMenus,
      [menuIndex]: !prevOpenSubMenus[menuIndex],
    }));
  };

  const Menus = [
    isAdmin && { title: "Usuarios", path: "/usuarios", icon: <UserGroupIcon className="h-5 w-5" /> },
    { title: "Home", path: "/home", icon: <HomeIcon className="h-5 w-5" /> },
    { title: "Leads", path: "/leads", icon: <UsersIcon className="h-5 w-5" /> },
    {
      title: "Pedidos",
      path: "/pedidos",
      icon: <RectangleStackIcon className="h-5 w-5" />,
      submenu: true,
      submenuItems: [
        { title: "Criar Pedido" },
        { title: "Listar Pedidos" },
        isAdmin && { title: "Excluir Pedido" },
        isAdmin && { title: "Alterar Pedido" },
      ].filter(Boolean) as MenuItem[]
    },
    {
      title: "Produtos",
      icon: <ShoppingCartIcon className="h-5 w-5" />,
      path: "/produtos",
      submenu: true,
      submenuItems: [
        { title: "Listar Produtos" },
        isAdmin && { title: "Excluir Produtos" },
        isAdmin && { title: "Alterar Produtos" },
      ].filter(Boolean) as MenuItem[],
    },
    {
      title: "Contratos",
      path: "/contratos",
      icon: <DocumentTextIcon className="h-5 w-5" />,
    },
  ].filter(Boolean) as MenuItem[];

  useEffect(() => {
    const activeMenu = Menus.find((menu) => location.pathname.startsWith(menu.path));

    if (activeMenu) {
      setSelectedTab(activeMenu.title);
    }
  }, [location.pathname, Menus]);
  
  return (
    <div className={`flex bg-zinc-200 min-h-screen`}>
      <nav
        className={`${
          open ? "w-64" : "w-20"
        } md:min-h-screen h-auto bg-blue-800 relative duration-200 shadow-lg`}
      >
        <button
          className={`w-8 h-8 border-2 rounded-full mt-4 ml-auto bg-zinc-100 text-blue-600 hover:text-white hover:bg-blue-500 absolute -right-3 ${
            !open ? "rotate-180" : ""
          }`}
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="ml-1 w-5 h-5 relative"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div
          className={`flex items-center ${
            open ? "w-52" : "w-11"
          } h-8 bg-blue-900 rounded-md px-2 mt-16 ml-5 transition-all duration-150`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-white w-5 h-5 block cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="search"
            placeholder="Pesquisar"
            className={`text-base bg-transparent rounded-none ${
              open ? "w-44" : "hidden"
            } focus:outline-none focus:ring-0 ml-2 text-white overflow-hidden transition-all`}
          />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className={`text-base font-semibold relative flex items-center gap-x-3 p-4 cursor-pointer hover:bg-blue-700 rounded-md m-4 ${
                  selectedTab === menu.title && "bg-blue-700"
                }`}
                onClick={() => {
                  if (!menu.submenu) {
                    navigate(menu.path);
                  } else {
                    toggleSubMenu(index);
                  }
                }}
              >
                <span className="text-white">{menu.icon}</span>
                <span className={`text-white ${!open && "hidden"}`}>
                  {menu.title}
                </span>
                {menu.submenu && (
                  <ChevronDownIcon
                    className="h-5 w-5 text-white ml-16"
                    onClick={() => handleTabClick(menu.title)}
                  />
                )}
              </li>
              {menu.submenu && openSubMenus[index] && (
                <ul>
                  {menu.submenuItems?.map((submenu, submenuIndex) => (
                    <li
                      key={submenuIndex}
                      className={`text-base font-semibold relative flex items-center gap-x-3 p-4 ${
                        open ? "" : "hidden"
                      } cursor-pointer text-white ml-3 hover:bg-blue-700 rounded-md m-4`}
                      onClick={() => {
                        navigate(`${menu.path}/${submenu.title.toLowerCase().replace(/\s+/g, '-')}`);
                      }}
                    >
                      {submenu.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
          <li
            className="text-base font-semibold flex items-center gap-x-3 p-4 cursor-pointer hover:bg-blue-700 rounded-md m-4 "
            onClick={() => signOutUser()}
          >
            <span className="text-white">
              <PowerIcon className="h-5 w-5" />
            </span>
            <span className={`text-white ${!open && "hidden"}`}>Sair</span>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default Sidebar;
