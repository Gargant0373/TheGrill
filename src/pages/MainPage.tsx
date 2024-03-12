import Navbar from "../components/Navbar";
import Pictures from "../components/Pictures";
import { Divider } from "@mui/material";
import Footer from "../components/Footer";
import Rules from "../components/Rules";

function MainPage() {
    return (
        <>
            <Navbar />
            <Divider />
            <Pictures />
            <Rules />
            <Footer />
        </>
    );
}

export default MainPage;