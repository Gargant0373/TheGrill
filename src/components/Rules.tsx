import { Grid } from '@mui/material';
import '../styles/Rules.scss';
import Fastfood from '@mui/icons-material/Fastfood';
import LocalLibrary from '@mui/icons-material/LocalLibrary';
import Delete from '@mui/icons-material/Delete';
import SmokeFree from '@mui/icons-material/SmokeFree';
import Pool from '@mui/icons-material/Pool';
import OutdoorGrill from '@mui/icons-material/OutdoorGrill';
import { SvgIconProps } from '@mui/material';
import { ReactElement, ComponentType } from 'react';
function Rules() {
    return (
        <Grid container className="rules">
            <Grid item xs={12}>
                <h1 className="chtitle" id="rules">GUIDELINES</h1>
            </Grid>
            <Guidelines />
        </Grid>
    );
}

function Guidelines() {
    return (
        <>
            <Grid item xs={10} md={4} className="node left">
                <div className='into'>
                    <Grid item xs={12}>
                        <h2 className="chsubtitle">Let's make something clear...</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="chtext">
                            The Grill is not a place for rules. We do not want to have rules when the sun is shining and beer is flowing. <br />
                            However, the last thing we want is to have the police or the fire department showing up. We are not in Romania, be civilized.<br />
                            Here's a list of <span className='primary bold' >"guidelines"</span>→
                        </div>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={10} md={6} className="node right">
                <Rule title="GRILLMASTER IS KING" icon={OutdoorGrill}
                    text="The grillmaster is the most important person at the grill. He is the one who makes sure the fire is burning and the meat is cooking. He is the one who feeds you. Always make sure there's someone to help him out" />
                <Rule title="NO STUDYING" icon={LocalLibrary}
                    text="The Grill is a place for fun, not for studying. No laptops or notebooks. They are only allowed for writing poems." />
                <Rule title="YOU BRING, YOU EAT" icon={Fastfood}
                    text="The balance of the grill relies on the fact that each individual contributes. If you bring something, you eat something. If you don't bring anything, you eat nothing. Your 'meat' might be enough for your girlfriend, not for us. Only exception from this rule is people who cross the lake swimming." />
                <Rule title="TRASH" icon={Delete}
                    text="We are not savages. We clean up after ourselves. There are no trash cans around the lake so you're expected to bring some bags yourself." />
                <Rule title="SMOKING KILLS" icon={SmokeFree}
                    text="We believe in the freedom of lighting up a cigarette. We do not like your cigarette buds. Make sure beer corks and cigarette buns are not left behind." />
                <Rule title="MEN SWIM" icon={Pool}
                    text="Men must take a bath before leaving the grill. The lake might not be warm, but the soul of the lovely ladies will be." />
            </Grid>
        </>
    );
}

function Rule(props: { title: string, icon: ComponentType<SvgIconProps>, text: string }) {
    return (
        <div className="rule">
            <div className="header">
                <h1 className="subtitle">{props.title}</h1>
                <div className="icon">
                    {<props.icon fontSize="large" />}
                </div>
            </div>

            <div className="text">
                {props.text}
            </div>
        </div>
    );
}

export default Rules;
