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
                        <div className="chsubtitle primary">1st of May</div>
                        <div className="chtext">
                            Everything started on the 1st of May, 2023, the National Workers day in Romania. <br />
                            Around 50 people gathered in Delftse Hout on one side of the lake and another 30 on the other side of the lake to enjoy an excellent grill with sunshine and beer. <br />
                            Because of the "marketing" efforts in the TU Delft community, The Grill quickly became a meme on campus.
                        </div>
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