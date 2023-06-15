import Navbar from "../components/Navbar";
import PostArea from "../components/PostArea";
import Timer from "../components/Timer";

function MainPage() {
    return (
        <>
            <Navbar />
            <Timer />
            <PostArea marginTop={"20px"}/>
        </>
    );
}

export default MainPage;