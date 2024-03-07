import { Grid } from "@mui/material";
import "../styles/Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/Github';

function Footer() {
    return <>
        <Grid container className="footer">
            <Grid container className="row">
                <Grid item xs={4} md={3}><div className="line" /></Grid>

                <Grid item xs={3} md={1} className="social">
                    <FacebookIcon className="icon" />
                    <GitHubIcon className="icon" />
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