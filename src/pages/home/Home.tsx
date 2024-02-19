import { useEffect } from "react";
import Sidebar from "./components/Sidebar"
import ContentHome from "./components/ContentHome";

const Home = () => {
    useEffect(() => {
        document.title = "Home | Tecnoponto"
     }, []);
    return(
        <Sidebar>
            <ContentHome />
        </Sidebar>
    )
}

export default Home