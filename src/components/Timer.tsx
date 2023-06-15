import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import "../styles/Timer.css";

function Timer() {
    const [time, setTime] = useState(Date.now());
    const date = 1687284000000;

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <Grid container spacing={0}>
            <Grid item xs={3} />
            <Grid container item xs={6} spacing={0} marginTop="1em" display="flex" alignContent="center" justifyContent="center">
                <Grid className="timer-box-left" item xs={2}>
                    <a className="text">{getDays(date, time)}</a>
                </Grid>
                <Grid className="timer-box-middle" item xs={1}>
                    <a className="text">:</a>
                </Grid>
                <Grid className="timer-box-middle" item xs={2}>
                    <a className="text">{getHours(date, time)}</a>
                </Grid>
                <Grid className="timer-box-middle" item xs={1}>
                    <a className="text">:</a>
                </Grid>
                <Grid className="timer-box-middle" item xs={2}>
                    <a className="text">{getMinutes(date, time)}</a>
                </Grid>
                <Grid className="timer-box-middle" item xs={1}>
                    <a className="text">:</a>
                </Grid>
                <Grid className="timer-box-right" item xs={2}>
                    <a className="text">{getSeconds(date, time)}</a>
                </Grid>
            </Grid>
            <Grid item xs={3} />
        </Grid>
    );
}

function pad(num: number) {
    if (num < 0) return "00";
    if (num < 10) return "0" + num;
    return num;
}

function getDays(date: number, time: number) {
    const days = Math.floor((date - time) / (1000 * 60 * 60 * 24));
    return pad(days);
}

function getHours(date: number, time: number) {
    return pad(Math.floor(((date - time) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
}

function getMinutes(date: number, time: number) {
    return pad(Math.floor(((date - time) % (1000 * 60 * 60)) / (1000 * 60)));
}

function getSeconds(date: number, time: number) {
    return pad(Math.floor(((date - time) % (1000 * 60)) / 1000));
}

export default Timer;