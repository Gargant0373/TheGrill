import { Card, CardContent, Grid } from "@mui/material";
import "../styles/History.css";

function History() {
    return <>
        <Grid container className="history" id="history">
            <Grid item xs={12} className="ptitle">
                <div className="chtitle">HISTORY</div>
            </Grid>
            <Grid item xs={10} md={4}>
                <img src="7.jpeg" alt="" />
            </Grid>
            <Grid item xs={11} md={7}>
                <Card className="card wmargin minh">
                    <CardContent>
                        <div className="chsubtitle primary underlined">1st of May</div>
                        <div className="chtext primary">
                            It all kicked off on the 1st of May, 2023, a day meant for honoring workers, but in Romania, it became the birthdate of something unexpected and delightful. Picture this: around 50
                            eager souls gathered on one side of the lake in Delftse Hout, while another 30 claimed their spot on the opposite bank. What was the occasion, you ask? A grand
                            celebration of grilling mastery paired with abundant sunshine and an endless flow of beer. <br />
                            As the aroma of grilling meats filled the air, it marked the beginning of something extraordinary. Through clever promotion within the TU Delft community, what began as a simple <br />
                            barbecue transformed into "The Grill," a campus-wide sensation embodying unity amidst academia. <br />
                            With each delicious bite and refreshing sip, The Grill embedded itself deeper into TU Delft's culture. From a modest gathering, it blossomed into a cherished tradition, fostering
                            connections and cherished memories for students and beyond. <br />
                            As the sun set on that memorable May day, The Grill had become an integral part of TU Delft's identity, promising joy and camaraderie for years to come.
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={11} md={7}>
                <Card className="card wmargin minh">
                    <CardContent>
                        <div className="chsubtitle primary underlined">Other Grills</div>
                        <div className="chtext primary">
                            Next month, another big celebration was planned, the 1st of June, the International Children's Day. How to enjoy these day better than with a grill next to the beautiful
                            lake Delftsehout, that took all of us streight to our childhood? All memories from when we were little and we would as girls help our moms prepare the salads, and
                            while the boys would bring wood for their dads, and help them with cooking the meet. Everyone is <br />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={10} md={4}>
                <img src="10.jpeg" alt="" />
            </Grid>
            <Grid item xs={10} md={4}>
                <img src="9.jpeg" alt="" />
            </Grid>
            <Grid item xs={11} md={7}>
                <Card className="card wmargin minh">
                    <CardContent>
                        <div className="chsubtitle primary underlined">Other Grills</div>
                        <div className="chtext primary">
                            Obviously the legendary grill was the original one. Many followed, there were many drifting cars, wooden sticks picked up, fires extinguished.<br />
                            At the end of the day one thing is certain though- many beers, laughs and mici have been consumed.
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>

}

export default History;