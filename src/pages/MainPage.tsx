import Navbar from "../components/Navbar";
import History from "../components/History";
import Pictures from "../components/Pictures";
import { Divider } from "@mui/material";
import Footer from "../components/Footer";

function MainPage() {
    return (
        <>
            <Navbar />
            <History />
            <Divider />
            <Pictures />
            <Footer />
        </>
    );
}

export default MainPage;