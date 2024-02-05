import { useEffect } from "react";
import Sidebar from "./components/Sidebar"

const Home = () => {
    useEffect(() => {
        document.title = "Home | Tecnoponto"
     }, []);
    return(
        <Sidebar/>
    )
}

export default Home