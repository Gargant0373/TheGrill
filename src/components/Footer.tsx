import { Grid, Tooltip } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

function Footer() {
    return <>

        <Grid container spacing={0}>
            <Grid item xs={5} />
            <Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
                <Tooltip title="Check out source code!">
                    <a href="https://github.com/Gargant0373/TheGrill" style={{
                        textDecoration: "none", color: "white",
                        display: "flex", alignItems: "center", justifyContent: "center", padding: "5px"
                    }}><GitHubIcon /> GitHub</a>
                </Tooltip>
            </Grid>
            <Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
                <Tooltip title="Call me!">
                    <a href="tel:+40772269013" style={{
                        textDecoration: "none", color: "white",
                        display: "flex", alignItems: "center", justifyContent: "center", padding: "5px"
                    }}><PermContactCalendarIcon /> Call</a>
                </Tooltip>
            </Grid>
            <Grid item xs={5} />
        </Grid>
    </>
}

export default Footer;