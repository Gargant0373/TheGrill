import { Card, CardContent, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "../styles/Pictures.css";

function Pictures() {
    const images = [
        "1.jpeg",
        "2.jpeg",
        "3.jpeg",
        "4.jpeg",
        "5.jpeg",
    ]

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        variableWidth: true,
    };

    return (
        <>
            <Grid container className="pictures" id="pictures">
                <Grid item xs={12} className="ptitle">
                    <div className="chtitle" id="pictures">PICTURES</div>
                </Grid>
                <Grid item md={1} />
                <Grid item md={6} xs={8} className="pcontainer">
                    <Slider {...settings}>
                        {images.map((image, index) => {
                            return (
                                <Grid className="pimg" key={index}>
                                    <img src={image} alt={image} />
                                </Grid>
                            )
                        })}
                    </Slider>
                </Grid>
                <Grid item md={1} xs={0} />
                <Grid item md={3} xs={8} className="pcontainer">
                    <Card>
                        <CardContent className="card">
                            <div className="chtext">
                                Here is a collection of pictures from previous grills. If you want to add your own pictures to the collection feel free to create a Pull Request.
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={1} xs={0} />
            </Grid>
        </>
    )
}

export default Pictures;