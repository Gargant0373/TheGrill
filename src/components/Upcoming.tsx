import { useEffect, useRef } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import Countdown from "./Countdown";
import "../styles/Upcoming.scss";

function Upcoming() {
    const options = {
        root: null, // the browser viewport is used
        rootMargin: '0px',
        threshold: 0.75
    };

    const imgShineContainerRef = useRef<HTMLDivElement>(null);
    const imgShineRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const makeShine = (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                const imgElement = imgShineRef.current;
                const imgContainer = imgShineContainerRef.current;
                if (imgElement) {
                    imgElement.classList.add('img-shine');
                }
                if (imgContainer) {
                    imgContainer.classList.add('imgShineContainerGo');
                }
            }
        };

        const observer = new IntersectionObserver(makeShine, options);
        const imgElement = imgShineRef.current;
        if (imgElement) {
            observer.observe(imgElement);
        }
    }, []);

    const textContent = {
        title: "UPCOMING EVENTS",
        subtitle: "The Grill is coming back!",
        date: "1st of May 2024",
        description: {
            bold: "Save the Date (in Google Calendar) →",
            link: "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=N29ob2Uyc3Y3aHBmZm1odGNpZGltcHJkazAgZWYzMWNhNmM0NDZkYTUzNGRhMzdiNzBmMzNkMGQ2NThkN2IyY2VkMWI5ZWM4MTE4NmU3N2JlOTBlZTY0YThmNUBn&tmsrc=ef31ca6c446da534da37b70f33d0d658d7b2ced1b9ec81186e77be90ee64a8f5%40group.calendar.google.com",
            text: "Whether you're a seasoned Grill veteran or a first-timer, you're sure to have a fantastic time. We can't wait to see you there!"
        },
        location: "The location is at the dog park in Delftse Hout. It is quite remote so the only people that we'd disturb are dogs!",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2455.266159034846!2d4.379298276903396!3d52.02024877310891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5fc0e68b003%3A0xafae8df75f4b558!2sHondenstrandje%20Delftse%20Hout!5e0!3m2!1sro!2snl!4v1711288474177!5m2!1sro!2snl"
    };

    return (
        <Grid container className="upcoming" id="upcoming">
            <Grid item xs={12} className="ptitle">
                <h1 className="chtitle">{textContent.title}</h1>
            </Grid>
            <Grid item xs={12} className="row">
                <Grid ref={imgShineContainerRef} item xs={12} md={5} className="imgShineContainer">
                    <img ref={imgShineRef} id="upcomingImg" src="new_invit.png" alt="grill_invitation" />
                </Grid>
                <Grid item xs={11} md={6} className="col">
                    <Card className="card">
                        <Grid item xs={12} md={10}>
                            <CardContent>
                                <div className="chsubtitle secondary bold underlined center">
                                    {textContent.subtitle}
                                </div>
                            </CardContent>
                            <Countdown />
                        </Grid>
                        <Grid item xs={11}>
                            <p className="chtext secondary bold">
                                {textContent.description.bold}{" "}
                                <a target="_blank" href={textContent.description.link}>
                                    {textContent.date}
                                </a>
                            </p>
                            <p className="chtext secondary">
                                {textContent.description.text}
                            </p>
                        </Grid>
                        <Grid item xs={11} className="row between">
                            <Grid item xs={12} md={5}>
                                <p className="chtext secondary">{textContent.location}</p>
                            </Grid>
                            <Grid item xs={12} md={6} className="map">
                                <iframe src={textContent.mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Upcoming;
