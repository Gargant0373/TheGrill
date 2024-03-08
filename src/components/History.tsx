import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import "../styles/History.css";


function History() {
    return <>
        <Grid container spacing="2" id="history">
            <Grid item xs={12} id="image">
                {/* <Slideshow></Slideshow> */}
                <Card className="mainCard">
                    <CardMedia sx={{ height: 500 }}
                        image="6.jpeg"
                        title="start" />
                    <CardContent>
                        {/* <Typography className="title" gutterBottom variant="h5" component="div">
                            How it all started...
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <h2>1 may</h2>
                            The first grill took place on a sunny day in May, by a small group of students wanting to celebrate the 1st of May.
                            This day has a big place in the hearth of every Romanian as every year, family and friends gather together to celebrate and forget
                            about their daily worries. The first grill was a success and it was decided that it should become a tradition.
                        </Typography> */}

                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    </>

}

export default History;