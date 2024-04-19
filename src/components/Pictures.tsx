import LeftArrow from '@mui/icons-material/KeyboardArrowLeft';
import RightArrow from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, Grid } from "@mui/material";
import { useRef } from "react";
import Slider from "react-slick";
import "../styles/Pictures.scss";

function Pictures() {
    const images = [
        "1.jpeg",
        "2.jpeg",
        "3.jpeg",
        "4.jpeg",
        "5.jpeg",
        "lake.mp4",
        "8.mp4"
    ]
    const slider = useRef<Slider>(null);
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
        arrows: false,
    };

    const renderMedia = (image: string, index: number) => {
        const key = `${image}-${index}`;
        return (
            <Grid className="pimg" key={key}>
                {image.includes("mp4") ? (
                    <video autoPlay loop muted>
                        <source src={image} type="video/mp4" />
                    </video>
                ) : (
                    <img src={image} alt={image} />
                )}
            </Grid>
        );
    };
    return (
        <>
            <Grid container className="pictures" id="pictures">
                <Grid item xs={12} className="ptitle">
                    <h1 className="chtitle">PICTURES</h1>
                </Grid>
                <Grid item md={10} xs={10} className="pcontainer">
                    <Card className="card">
                        <CardContent>
                            <h1 className="chsubtitle secondary underlined">Memories Captured</h1>
                            <p className="chtext secondary">
                                Here's a collection of pictures from previous grills.
                                <br />
                                We are looking to expand the collection with your pictures, feel free to send them to us!
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item container md={12} xs={12} className="pcontainer">
                    <Grid item xs={1} className="buttonHolderPrev">
                        <button type='button' className="slider-btn button-back"
                            onClick={() => slider?.current?.slickPrev()}>
                            <LeftArrow className="arrow-icon" />
                            <LeftArrow className="arrow-left-appear arrow-icon" />
                        </button>
                    </Grid>


                    <Grid item xs={10}>
                        <Slider ref={slider} {...settings}>
                            {images.map(renderMedia)}
                        </Slider>
                    </Grid>
                    <Grid item xs={1} className="buttonHolderNext">
                        <button type='button' className="slider-btn button-next"
                            onClick={() => slider?.current?.slickNext()}>
                            <RightArrow className="arrow-icon" />
                            <RightArrow className="arrow-right-appear arrow-icon"
                            />
                        </button>
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
}

export default Pictures;