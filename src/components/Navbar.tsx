import { Grid } from '@mui/material';
import '../styles/Navbar.css';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

function Navbar() {

    const scrollTo = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (!element) return;
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop - 100
        });
    }

    return <>
        <Grid container className="navbar">
            <ParallaxProvider>
                <Grid item xs={12} className="node">
                    <img src="6.jpeg" className="bg" alt="background" />
                </Grid>
                <Grid item xs={12} className="node ttl">
                    <Parallax speed={10}>
                        <div className="fire">THE GRILL</div>
                    </Parallax>
                </Grid>
                <Grid item xs={12} md={9} className="node text">
                    <a onClick={() => scrollTo("history")}>
                        <Parallax speed={10}>
                            <div className="item">HISTORY</div>
                        </Parallax>
                    </a>
                    <a onClick={() => scrollTo("pictures")}>
                        <Parallax speed={10}>
                            <div className="item">PICTURES</div>
                        </Parallax>
                    </a>
                    <a onClick={() => scrollTo("rules")}>
                        <Parallax speed={10}>
                            <div className="item">GUIDELINES</div>
                        </Parallax>
                    </a>
                </Grid>
            </ParallaxProvider>
        </Grid>
    </>
}

export default Navbar;