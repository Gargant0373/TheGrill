import { Card, CardContent, Grid } from "@mui/material";
import "../styles/History.css";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { useState, useEffect } from 'react';
function History() {
    const [parallaxSpeed, setParallaxSpeed] = useState(-2);
    const [shortText1, setShortText1] = useState(false);
    const [shortText2, setShortText2] = useState(true);

    const [smallScreen, setSmallScreen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setParallaxSpeed(0);
                setSmallScreen(true);
            } else {
                setParallaxSpeed(-2);
                setSmallScreen(false);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <>
        <Grid container className="history" id="history">
            <ParallaxProvider>
                <Grid item xs={12} className="ptitle">
                    <h1 className="chtitle">HISTORY</h1>
                </Grid>
                <Grid item xs={11} md={4}>
                    <Parallax speed={parallaxSpeed}>
                        <img src="7.jpeg" alt="" />
                    </Parallax>
                </Grid>
                <Grid item xs={11} md={7}>
                    <Card className="card wmargin minh">
                        <CardContent>
                            <h1 className="chsubtitle primary underlined">1st of May</h1>
                            <p className="chtext primary">
                                It all kicked off on the 1st of May, 2023, a day meant for honoring workers, but in Romania, it became the birthday of something unexpected and delightful.
                                <br />
                                Picture this: around 50
                                eager souls gathered on one side of the lake in Delftse Hout, while another 30 claimed their spot on the opposite bank.
                                <br />
                                What was the occasion, you ask? A grand
                                celebration of grilling mastery paired with abundant sunshine and an endless flow of beer.
                                <br />
                                {(!shortText1) &&
                                    <span>
                                        As the aroma of grilling meats filled the air, it marked the beginning of something extraordinary. Through clever promotion within the TU Delft community, what began as a simple
                                        <br />
                                        barbecue transformed into "The Grill," a campus-wide sensation embodying unity amidst academia. <br />
                                        With each delicious bite and refreshing sip, The Grill embedded itself deeper into TU Delft's culture. From a modest gathering,
                                        it blossomed into a cherished tradition, fostering
                                        connections and cherished memories for students and beyond.
                                        <br />
                                        As the sun set on that memorable May day, The Grill had become an integral part of TU Delft's identity,
                                        promising joy and camaraderie for years to come.
                                    </span>}

                            </p>
                        </CardContent>
                        {smallScreen && (<button type="button" className="showmore"
                            onClick={() => setShortText1(!shortText1)}> {shortText1 ? "Read more..." : "Read less..."} </button>)}
                    </Card>
                </Grid>
                <Grid item xs={11} md={7}>
                    <Card className="card wmargin minh">
                        <CardContent>
                            <h1 className="chsubtitle primary underlined">1st of June</h1>
                            <p className="chtext primary">
                                Next month, another big celebration was planned, the 1st of June, the International Children's Day. How to enjoy these day better than with a grill next to the beautiful
                                lake Delftse Hout, that took all of us straight to our childhood?
                                <br />
                                {(!shortText2 || !smallScreen) &&
                                    <span> All memories from when we were little started to come around. How we would help our moms prepare the salad, and our dads to light up the fire and make
                                        the grill. Everything was feeling like back then, enjoying the sun and celebrating our day together. <br />
                                        <br />
                                        Everyone is welcomed to join and relive those cherished moments,
                                        to blend the joy of childhood memories with the warmth of community spirit and to enjoy the new tradition: The Grill. </span>}
                            </p>
                        </CardContent>
                        {smallScreen && (<button type="button" className="showmore"
                            onClick={() => setShortText2(!shortText2)}> {shortText2 ? "Read more..." : "Read less..."} </button>)}

                    </Card>
                </Grid>
                <Grid item xs={10} md={4}>
                    <img src="10.jpeg" alt="" />
                </Grid>
                <Grid item xs={10} md={4}>
                    <Parallax speed={parallaxSpeed}>
                        <img src="9.jpeg" alt="" />
                    </Parallax>
                </Grid>
                <Grid item xs={11} md={7}>
                    <Card className="card wmargin minhh">
                        <CardContent>
                            <h1 className="chsubtitle primary underlined">Other Grills</h1>
                            <div className="chtext primary">
                                Obviously the legendary grill was the original one. Many followed, there were many drifting cars, wooden sticks picked up, fires extinguished.<br />
                                At the end of the day one thing is certain though - many beers, laughs and <span className="rogradient">mici</span>  have been consumed. <br />
                                We never missed an occasion to celebrate with a grill, be it a birthday, a holiday, the beginning of a new scholar year or just a sunny day. <br />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </ParallaxProvider>
        </Grid>
    </>

}

export default History;