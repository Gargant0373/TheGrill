import { Grid } from "@mui/material";
import Countdown from "./Countdown";

function Upcoming() {
    return (
        <Grid container className="upcoming" id="upcoming">
            <Grid item xs={12} className="ptitle">
                <h1 className="chtitle">UPCOMING EVENTS</h1>
            </Grid>
            <Grid item xs={12} className="countdown">
                <Countdown />
            </Grid>
        </Grid>
    );
}

export default Upcoming;    