import { Card, CardContent, Grid, Paper } from '@mui/material';
import '../styles/Rules.css';
import { Diversity2 } from '@mui/icons-material';

function Rules() {
    return <>
        <Grid container className="rules">
            <Grid item xs={12}>
                <div className="chtitle" id="rules">RULES</div>
            </Grid>
            <Grid item xs={10} md={5} className="node left">
                <div>
                    <Grid item xs={12}>
                        <div className="chsubtitle">Let's make something clear...</div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="chtext">
                            The Grill is not a place for rules. We do not want to have rules when the sun is shining and beer is flowing. <br />
                            However, the last thing we want is to have the police or the fire department showing up. <br />
                        </div>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={10} md={5} className="node right">
                <Rule title="GRILLMASTER IS KING"
                    text="The grillmaster is the most important person at the grill. He is the one who makes sure the fire is burning and the meat is cooking. He is the one who feeds you. Always make sure there's someone to help him out" />
                <Rule title="NO STUDYING"
                    text="The Grill is a place for fun, not for studying. No laptops or notebooks. They are only allowed for writing poems." />
                <Rule title="YOU BRING, YOU EAT"
                    text="The balance of the grill relies on the fact that each individual contributes. If you bring something, you eat something. If you don't bring anything, you eat nothing. Only exception from this rule is people who cross the lake swimming." />
                <Rule title="TRASH"
                    text="We are not savages. We clean up after ourselves. There are no trash cans around the lake so you're expected to bring some bags yourself." />
                <Rule title="SMOKING KILLS"
                    text="We believe in the freedom of lighting up a cigarette. We do not like your cigarette buds. Make sure beer corks and cigarette buns are not left behind." />
                <Rule title="MEN SWIM"
                    text="Men must take a bath before leaving the grill. The lake might not be warm, but the soul of the lovely ladies will be." />
            </Grid>


        </Grid >
    </>
}

function Rule(props: { title: string, text: string }) {
    return (
        <div className="rule">
            <div className="subtitle">{props.title}</div>
            <div className="text">
                {props.text}
            </div>
        </div>
    )
}

export default Rules;