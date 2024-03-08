import { Grid, Typography } from '@mui/material';
import '../styles/Navbar.css'

function Navbar() {

    let scrollTo = (elementId: string) => {
        var element = document.getElementById(elementId);
        if (!element) return;
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop - 100
        });
    }

    return <>
        <Grid container className="navbar">
            <Grid item xs={12} className="node">
                <img src="6.jpeg" className="bg" />
            </Grid>
            <Grid item xs={12} className="node ttl">
                <div className="fire">THE GRILL</div>
            </Grid>
            <Grid item xs={12} md={9} className="node text">
                <a onClick={() => scrollTo("history")}>
                    <div className="item">HISTORY</div>
                </a>
                <a onClick={() => scrollTo("pictures")}>
                    <div className="item">PICTURES</div>
                </a>
                <a onClick={() => scrollTo("rules")}>
                    <div className="item">RULES</div>
                </a>
            </Grid>
        </Grid>
    </>
}

export default Navbar;