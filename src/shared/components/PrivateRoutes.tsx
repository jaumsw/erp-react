import { useLocation, Outlet, Navigate } from "react-router-dom";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoutes = () => {
  const { token } = parseCookies();
  const location = useLocation();
  
  return (
    token
      ? <Outlet />
      : <Navigate to={"/"} state={{ from: location }} replace />
  );
};

const AdminRoutes = () => {
  const { token } = parseCookies();
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();

  return (
    token && isAdmin
      ? <Outlet />
      : <Navigate to={"/"} state={{ from: location }} replace />
  );
}

export { AdminRoutes, PrivateRoutes }; 
