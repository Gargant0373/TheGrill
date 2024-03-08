import Navbar from "../components/Navbar";
import Pictures from "../components/Pictures";
import { Divider } from "@mui/material";
import Footer from "../components/Footer";

function MainPage() {
    return (
        <>
            <Navbar />
            <Divider />
            <Pictures />
            <Footer />
        </>
    );
}

export default MainPage;