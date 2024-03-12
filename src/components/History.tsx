import { Card, CardContent, Grid } from "@mui/material";
import "../styles/History.css";


function History() {
    return <>
        <Grid container className="history">
            <Grid item xs={12} className="ptitle">
                <div className="chtitle" id="pictures">History</div>
            </Grid>
            <Grid item xs={8} md={5}>
                <Card className="card wmargin">
                    <CardContent>
                        <img src="7.jpeg" alt="" />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8} md={5}>
                <Card className="card wmargin">
                    <CardContent>
                        <div className="chsubtitle primary">1st of May</div>
                        <div className="chtext">
                            Everything started on the 1st of May, 2023, the National Workers day in Romania. <br />
                            Around 50 people gathered in Delftse Hout on one side of the lake and another 30 on the other side of the lake to enjoy an excellent grill with sunshine and beer. <br />
                            Because of the "marketing" efforts in the TU Delft community, The Grill quickly became a meme on campus. <br />
                            As everyoone enjoy the sunny day, nice atmosphere, the grill and the cold beer, the grill soon became a tradition for some of the students at TU Delft (but anyone else
                            would also be more than welcomed to start taking part of this tradition).
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8} md={5}>
                <Card className="card wmargin">
                    <CardContent>
                        <div className="chsubtitle primary">Other Grills</div>
                        <div className="chtext">
                            Next month, another big celebration was planned, the 1st of June, the International Children's Day. How to enjoy these day better than with a grill next to the beautiful
                            lake Delftsehout, that took all of us streight to our childhood. All memories from when we were little and we would as girls help our moms prepare the salads, and
                            while the boys would bring wood for their dads, and help them with cooking the meet.<br />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8} md={5}>
                <Card className="card wmargin">
                    <CardContent>
                        <img src="10.jpeg" alt="" />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8} md={5}>
                <Card className="card wmargin">
                    <CardContent>
                        <img src="9.jpeg" alt="" />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8} md={5}>
                <Card className="card wmargin">
                    <CardContent>
                        <div className="chsubtitle primary">Other Grills</div>
                        <div className="chtext">
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