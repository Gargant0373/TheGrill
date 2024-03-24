import { Card, CardContent, Grid } from "@mui/material";
import Countdown from "./Countdown";
import "../styles/Upcoming.css";

function Upcoming() {
    return (
        <Grid container className="upcoming" id="upcoming">
            <Grid item xs={12} className="ptitle">
                <h1 className="chtitle">UPCOMING EVENTS</h1>
            </Grid>
            <Countdown />
            <Grid item xs={10} className="row">
                <Grid item xs={4} className="col ">
                    {/* TODO: insert new invitation */}
                    <img src="7.jpeg" alt="" />
                </Grid>
                <Grid item xs={7} className="col">
                    <Grid item xs={11} className="row">
                        <Card className="card wmargin">
                            <CardContent>
                                <p className="chtext secondary">
                                    The Grill is back for another year! Join us on the 1st of May, 2024, for a day of delicious food,
                                    cold drinks, and great company. Whether you're a seasoned Grill veteran or a first-timer, you're
                                    sure to have a fantastic time. We can't wait to see you there!
                                </p>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={11} className="row">
                        <Grid item xs={5} className="minhw">
                            {/* <div id="fb-root"></div>
                            <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v19.0" nonce="J8Ul1obp"></script>
                            <div className="fb-page" data-href="https://www.facebook.com/events/334566999051529" data-tabs="timeline" data-width="Min. 180" data-height="Min. 70"
                                data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"></div> */}
                            <Card className="card">
                                <CardContent>
                                    <p className="chtext secondary minh">
                                        Check out our <a href="https://fb.me/e/527IVfMk3">Facebook event</a> for more information and to let us know you're coming!
                                    </p>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={5} className="minhw">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2455.266159034846!2d4.379298276903396!3d52.02024877310891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5fc0e68b003%3A0xafae8df75f4b558!2sHondenstrandje%20Delftse%20Hout!5e0!3m2!1sro!2snl!4v1711288474177!5m2!1sro!2snl" width="300px" height="300px" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Upcoming;    