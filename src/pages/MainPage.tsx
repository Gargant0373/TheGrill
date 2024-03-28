import Navbar from "../components/Navbar";
import Pictures from "../components/Pictures";
import { Divider } from "@mui/material";
import Footer from "../components/Footer";
import Rules from "../components/Rules";
import History from "../components/History";
import Upcoming from "../components/Upcoming";
import GodRays from "../components/GodRays";

function MainPage() {
    return (
        <>
            <Navbar />
            <Divider />
            <Upcoming />
            <History />
            <Pictures />
            <Rules />
            <Footer />
            <GodRays />
        </>
    );
}

export default MainPage;