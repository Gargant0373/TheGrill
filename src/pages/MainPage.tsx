import Navbar from "../components/Navbar";
import Pictures from "../components/Pictures";
import { Divider } from "@mui/material";
import Footer from "../components/Footer";
import Rules from "../components/Rules";
import History from "../components/History";

function MainPage() {
    return (
        <>
            <Navbar />
            <Divider />
            <History />
            <Pictures />
            <Rules />
            <Footer />
        </>
    );
}

export default MainPage;