import Navbar from "../components/Navbar";
import History from "../components/History";
import Pictures from "../components/Pictures";
import { Divider } from "@mui/material";

function MainPage() {
    return (
        <>
            <Navbar />
            <History />
            <Divider />
            <Pictures />
        </>
    );
}

export default MainPage;