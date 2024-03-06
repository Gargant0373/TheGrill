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
            <Grid item xs={12} md={3} className="node">
                <img src="logo.png" />
            </Grid>
            <Grid item xs={12} md={9} className="node text">
                <a onClick={() => scrollTo("history")}>
                    <Typography variant="h6" className="item">HISTORY</Typography>
                </a>
                <a onClick={() => scrollTo("pictures")}>
                    <Typography variant="h6" className="item">PICTURES</Typography>
                </a>
                <a onClick={() => scrollTo("rules")}>
                    <Typography variant="h6" className="item">RULES</Typography>
                </a>
            </Grid>
        </Grid>
    </>
}

export default Navbar;