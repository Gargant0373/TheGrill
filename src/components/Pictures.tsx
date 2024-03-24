import { Card, CardContent, Grid } from "@mui/material";
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        variableWidth: true,
        adaptiveHeight: true,
        autoplay: true,
        pauseOnHover: true,
    };

    return (
        <>
            <Grid container className="pictures" id="pictures">
                <Grid item xs={12} className="ptitle">
                    <h1 className="chtitle">PICTURES</h1>
                </Grid>
                <Grid item md={8} xs={8} className="pcontainer">
                    <Slider {...settings}>
                        {images.map((image, index) => {
                            const key = `${image}-${index}`;
                            return (
                                <Grid className="pimg" key={key}>
                                    <img src={image} alt={image} />
                                </Grid>
                            )
                        })}
                    </Slider>
                </Grid>
                <Grid item md={2} className="pcontainer">
                    <Card className="card minh">
                        <CardContent>
                            <p className="chtext secondary">
                                Here's a collection of pictures from previous grills.
                                <br />
                                We are looking to expand the collection with your pictures, feel free to send them to us!
                                <br />
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Pictures;