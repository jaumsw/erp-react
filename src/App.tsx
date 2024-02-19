import { PrivateRoutes, AdminRoutes } from "./shared/components/PrivateRoutes";
import { Login } from "./pages/login/Login";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/users/Users";
import Home from "./pages/home/Home";
import Leads from "./pages/leads/Leads";
import CreateOrder from "./pages/orders/create-order/CreateOrder";
import ListOrders from "./pages/orders/list-orders/ListOrders";
import ListProducts from "./pages/products/list-products/ListProducts";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/pedidos/criar-pedido" element={<CreateOrder />} />
            <Route path="/pedidos/listar-pedidos" element={<ListOrders />} />
            <Route path="/produtos/listar-produtos" element={<ListProducts />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/usuarios" element={<Users />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
