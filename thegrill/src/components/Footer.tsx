import "./Footer.css";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

function Footer() {
    return <>
        <footer>
            <div className="footer-heading">
                <h1>Check us out on socials!</h1>
            </div>
            <div className="footer-content">
                <div className="line" />
                <div className="socials">
                    <a href="https://www.instagram.com/thegrill.life" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://github.com/Gargant0373/TheGrill" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                </div>
                <div className="line" />
            </div>
            <div className="footer-bottom">
                <h2>From students, With Students, For students</h2>
                <p>&copy; 2025 The Grill</p>
            </div>
        </footer>
    </>
}

export default Footer;