import { Card, CardContent, Grid } from "@mui/material";
import "../styles/Upcoming.scss";
import Countdown from "./Countdown";
import { useEffect } from "react";
import React from "react";
function Upcoming() {
    const options = {
        root: null, // the browser viewport is used
        rootMargin: '0px',
        threshold: 0.75
    }
    const imgShineContainer = React.useRef<HTMLDivElement>(null);
    const imgShine = React.useRef<HTMLImageElement>(null);
    useEffect(() => {
        const makeShine = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            console.log("makeShine");
            // check if the element is in view
            console.log(entries);
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const imgElement = imgShine.current;
                    const imgContainer = imgShineContainer.current;
                    if (imgElement) {
                        imgElement.classList.add('img-shine');
                    }
                    if (imgContainer) {
                        imgContainer.classList.add('imgShineContainerGo');
                    }
                    // observer.unobserve(entry.target);
                }
            }
            // remove the class if the element leaves view
        }
        const observer = new IntersectionObserver(makeShine, options);
        const imgElement = imgShine.current;
        if (imgElement) {
            observer.observe(imgElement);
        }
    }, []);
    
    
    return (
        <Grid container className="upcoming" id="upcoming">
            <Grid item xs={12} className="ptitle">
                <h1 className="chtitle">
                    UPCOMING EVENTS
                </h1>
            </Grid>
            <Grid item xs={12} className="row">
                <Grid ref={imgShineContainer} item xs={12} md={5} className="imgShineContainer" >
                    <img ref={imgShine} id="upcomingImg" src="10.jpeg" alt="grill_invitation" />
            
                </Grid>
                <Grid item xs={11} md={6} className="col">
                    <Card className="card">
                        <Grid item xs={12} md={10}>
                            <CardContent>
                                <div className="chsubtitle secondary bold underlined center">
                                    The Grill is coming back!
                                </div>
                            </CardContent>
                            <Countdown />
                        </Grid>
                        <Grid item xs={11}>
                            <p className="chtext secondary bold">
                                Save the Date (in Google Calendar) → <a target="_blank" href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=MjU0MGM0N2FwczIxaTh2aXQ0aGxjZGtiOTUgZWYzMWNhNmM0NDZkYTUzNGRhMzdiNzBmMzNkMGQ2NThkN2IyY2VkMWI5ZWM4MTE4NmU3N2JlOTBlZTY0YThmNUBn&amp;tmsrc=ef31ca6c446da534da37b70f33d0d658d7b2ced1b9ec81186e77be90ee64a8f5%40group.calendar.google.com">
                                    1st of May 2024
                                </a>
                            </p>
                            <p className="chtext secondary">
                                Whether you're a seasoned Grill veteran or a first-timer, you're
                                sure to have a fantastic time. We can't wait to see you there!
                            </p>
                        </Grid>
                        <Grid item xs={11} className="row between">
                            <Grid item xs={12} md={5}>
                                <p className="chtext secondary">The location is at the dog park in Delftse Hout.
                                    It is quite remote so the only people that we'd disturb are dogs!
                                </p>
                            </Grid>
                            <Grid item xs={12} md={6} className="map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2455.266159034846!2d4.379298276903396!3d52.02024877310891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5fc0e68b003%3A0xafae8df75f4b558!2sHondenstrandje%20Delftse%20Hout!5e0!3m2!1sro!2snl!4v1711288474177!5m2!1sro!2snl" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid >
        </Grid >
    );
}

export default Upcoming;    