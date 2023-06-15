import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PostArea from "../components/PostArea";
import Timer from "../components/Timer";

function MainPage() {
    return (
        <>
            <Navbar />
            <Timer />
            <PostArea marginTop={"20px"} />
            <div style={{
                margin: "0", backgroundColor: "#1f1f1f", position: "fixed", left: "0", bottom: "0", width: "100%"
            }}>
                <Footer />
            </div>
        </>
    );
}

export default MainPage;