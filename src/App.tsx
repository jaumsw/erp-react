import Home from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import PrivateRoutes from "./shared/components/PrivateRoutes"
import { AuthProvider } from "./shared/contexts/AuthContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export function App() {
  return (
    <AuthProvider>
     <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>}>
        <Route path="/home" element={<Home/>}/>
        </Route>
        <Route path="/" element={<Login/>}/>
      </Routes>
     </BrowserRouter>
    </AuthProvider>
  )
}

export default App
