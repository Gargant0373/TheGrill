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
        const handleResize = () => setSmallScreen(window.innerWidth < 900);

        window.addEventListener('scroll', handleScroll);
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
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

    const renderNavItem = (text: string, targetId: string) => (
        <a onClick={() => scrollTo(targetId)}>
            <Parallax speed={10}>
                <div className="item scrollsection" style={{ fontSize: `${smallScreen ? '15px' : '25px'}` }}>
                    {text}
                </div>
            </Parallax>
        </a>
    );

    return (
        <Grid container className="navbar">
            <ParallaxProvider>
                <Grid item xs={12} className="node">
                    <img src="6.jpeg" className="bg" alt="background" />
                </Grid>
                <Grid item xs={12} className="node ttl">
                    <ParticleText styleProp={{ transform: `translateY(${-1 * scrollDistance * 0.2}px)` }} textSizeProp={smallScreen ? 100 : 180} canvasWidthVal={smallScreen ? 380 : 800} />
                </Grid>
                <Grid item xs={12} md={9} className="node text">
                    {renderNavItem('EVENTS', 'upcoming')}
                    {renderNavItem('HISTORY', 'history')}
                    {renderNavItem('PICTURES', 'pictures')}
                    {renderNavItem('GUIDELINES', 'rules')}
                </Grid>
            </ParallaxProvider>
        </Grid>
    );
}

export default Navbar;
