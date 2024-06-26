import { Button, Card, CardContent, Grid, styled } from "@mui/material";
import { useState, useEffect } from 'react';
import "../styles/History.css";

function History() {
    const [shortText1, setShortText1] = useState(true);
    const [shortText2, setShortText2] = useState(true);
    const [smallScreen, setSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setSmallScreen(window.innerWidth < 900);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const ReadButton = styled(Button)({
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'white',
        borderColor: 'white'
    });

    const renderReadButton = (textState: boolean, handleToggle: () => void) => (
        smallScreen && (
            <ReadButton variant="outlined" className="showmore" onClick={handleToggle}>
                {textState ? "Read more..." : "Read less..."}
            </ReadButton>
        )
    );

    const historyText = {
        history1: {
            title: "1st of May 2023",
            content: `It all started on May 1, 2023, Romania's unexpected and delightful celebration amidst honoring workers.<br />
                      Around 50 gathered on one side of Delftse Hout lake, with 30 on the opposite bank.<br />
                      What was the occasion? A grand celebration of grilling mastery, abundant sunshine, and endless beer.`,
            additionalContent: `As grilling aromas filled the air, it marked the start of something extraordinary.<br />
                                Through clever promotion within TU Delft, the simple barbecue evolved into "The Grill," a campus-wide sensation fostering connections and cherished memories.`
        },
        history2: {
            title: "1st of June 2023",
            content: `Next month, another big celebration was planned, the 1st of June, the International Children's Day.<br />
                      How to enjoy these day better than with a grill next to the beautiful lake Delftse Hout, that took all of us straight to our childhood?`,
            additionalContent: `All memories from when we were little and we would as girls help our moms prepare the salads, and
                                while the boys would bring wood for our dads and help them with cooking the meat.<br />
                                Everyone is welcomed to join and relive those cherished moments,
                                to blend the joy of childhood memories with the warmth of community spirit.`
        },
        otherGrills: {
            title: "Other Grills",
            content: `Obviously the legendary grill was the original one. Many followed, there were many drifting cars, wooden sticks picked up, fires extinguished.<br />
                      At the end of the day one thing is certain though - many beers, laughs and <span className="rogradient">mici</span>  have been consumed.`
        }
    };

    return (
        <Grid container className="history" id="history">
            <Grid item xs={12} className="ptitle">
                <h1 className="chtitle">HISTORY</h1>
            </Grid>
            <Grid item xs={11} md={4} className="icontainer">
                <img src="7.jpeg" alt="" />
            </Grid>
            <Grid item xs={11} md={7}>
                <Card className="card wmargin minh">
                    <CardContent>
                        <h1 className="chsubtitle secondary underlined">{historyText.history1.title}</h1>
                        <p className="chtext secondary" dangerouslySetInnerHTML={{ __html: shortText1 && smallScreen ? historyText.history1.content : historyText.history1.content + historyText.history1.additionalContent }}></p>
                    </CardContent>
                    {renderReadButton(shortText1, () => setShortText1(!shortText1))}
                </Card>
            </Grid>
            {smallScreen && <Grid item xs={11} md={4}><img src="10.jpeg" alt="" className="icontainer" /></Grid>}
            <Grid item xs={11} md={7}>
                <Card className="card wmargin minh">
                    <CardContent>
                        <h1 className="chsubtitle secondary underlined">{historyText.history2.title}</h1>
                        <p className="chtext secondary" dangerouslySetInnerHTML={{ __html: shortText2 && smallScreen ? historyText.history2.content : historyText.history2.content + historyText.history2.additionalContent }}></p>
                    </CardContent>
                    {renderReadButton(shortText2, () => setShortText2(!shortText2))}
                </Card>
            </Grid>
            {!smallScreen && <Grid item xs={11} md={4}><img src="10.jpeg" alt="" className="icontainer" /></Grid>}
            <Grid item xs={11} md={4}>
                <img src="9.jpeg" alt="" className="icontainer" />
            </Grid>
            <Grid item xs={11} md={7}>
                <Card className="card wmargin minh">
                    <CardContent>
                        <h1 className="chsubtitle secondary underlined">{historyText.otherGrills.title}</h1>
                        <div className="chtext secondary" dangerouslySetInnerHTML={{ __html: historyText.otherGrills.content }}></div>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default History;