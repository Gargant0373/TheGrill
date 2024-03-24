import { Grid, Tooltip } from "@mui/material";
import "../styles/Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/Github';

function Footer() {
    return <>
        <Grid container className="footer">
            <Grid container className="row margin">
                <div className="ftext small">
                    Special thanks to our parteners:
                </div>
            </Grid>
            <Grid container className="row margin overlay">
                <Grid item xs={3}>
                    <div className="lcontainer ftext">
                        <img src="bg-society.png" alt="Backgammon Society" className="logo" />
                        Backgammon Society
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="lcontainer ftext">
                        <img src="BSA.png" alt="Backgammon Society" className="logo" />
                        Balcan Student Association
                    </div>
                </Grid>
            </Grid>
            <Grid container className="row">
                <Grid item xs={4} md={3}><div className="line" /></Grid>

                <Grid item xs={3} md={1} className="social">
                    <a href="https://fb.me/e/6LMXKsHgr">
                        <Tooltip title="Facebook Event">
                            <FacebookIcon className="icon" />
                        </Tooltip>
                    </a>
                    <a href="https://github.com/Gargant0373/TheGrill">
                        <Tooltip title="GitHub Repository">
                            <GitHubIcon className="icon" />
                        </Tooltip>
                    </a>
                </Grid>

                <Grid item xs={4} md={3}><div className="line" /></Grid>
            </Grid>
            <Grid container className="row">
                <Grid item xs={12}>
                    <div className="ftext">
                        For Students, With Students, From Students
                    </div>
                </Grid>
            </Grid>
        </Grid>
    </>
}

export default Footer;