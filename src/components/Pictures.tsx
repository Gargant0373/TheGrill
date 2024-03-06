import { Grid, Typography } from "@mui/material";
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
                    <Typography variant="h4" align="center">Pictures</Typography>
                </Grid>
                <Grid item md={1} />
                <Grid item md={4} xs={8} className="pcontainer">
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
                <Grid item md={2} xs={0} />
                <Grid item md={4} xs={8} className="pcontainer">
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec nunc nec odio
                    </Typography>
                </Grid>
                <Grid item md={1} xs={0} />
            </Grid>
        </>
    )
}

export default Pictures;