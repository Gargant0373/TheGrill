import { Grid } from "@mui/material";
import CountDown from "./Countdown";

function Upcoming() {
    return (
        <Grid container className="upcoming" id="upcoming">
            <Grid item xs={12} className="ptitle">
                <h1 className="chtitle">UPCOMING EVENTS</h1>
            </Grid>
            <Grid item xs={12} className="countdown">
                <CountDown />
            </Grid>
        </Grid>
    );
}

export default Upcoming;    