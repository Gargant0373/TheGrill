import Navbar from "../components/Navbar";
import Pictures from "../components/Pictures";
import { Divider } from "@mui/material";
import Footer from "../components/Footer";
import Rules from "../components/Rules";
import History from "../components/History";
import Upcoming from "../components/Upcoming";

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
        </>
    );
}

export default MainPage;