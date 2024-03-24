import { Grid } from '@mui/material';
import '../styles/Navbar.css';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';
import ParticleText from './ParticleText';
function Navbar() {
    const [smallScreen, setSmallScreen] = useState(false);
    const [scrollDistance, setScrollDistance] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => setScrollDistance(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const customParallax = {
        transform: `translateY(${-1 * scrollDistance * 0.2}px)`
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setSmallScreen(true);
            } else {
                setSmallScreen(false);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    {/* <Parallax speed={10}>
                        
                        <div className="fire">THE GRILL</div>
                    </Parallax> */}
                    <ParticleText styleProp={customParallax} textSizeProp={smallScreen ? 100 : 180} />
                </Grid>
                <Grid item xs={12} md={9} className="node text">
                    <a onClick={() => scrollTo("upcoming")}>
                        <Parallax speed={10}>
                            <div className="item scrollsection" style={{ fontSize: `${smallScreen ? '15px' : '25px'}` }}>EVENTS</div>
                        </Parallax>
                    </a>
                    <a onClick={() => scrollTo("history")}>
                        <Parallax speed={10}>
                            <div className="item scrollsection" style={{ fontSize: `${smallScreen ? '15px' : '25px'}` }} >HISTORY</div>
                        </Parallax>
                    </a>
                    <a onClick={() => scrollTo("pictures")}>
                        <Parallax speed={10}>
                            <div className="item scrollsection" style={{ fontSize: `${smallScreen ? '15px' : '25px'}` }}>PICTURES</div>
                        </Parallax>
                    </a>
                    <a onClick={() => scrollTo("rules")}>
                        <Parallax speed={10}>
                            <div className="item scrollsection" style={{ fontSize: `${smallScreen ? '15px' : '25px'}` }}>GUIDELINES</div>
                        </Parallax>
                    </a>
                </Grid>
            </ParallaxProvider>
        </Grid>
    </>
}

export default Navbar;