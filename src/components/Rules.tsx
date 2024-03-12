import { Card, CardContent, Grid, Paper } from '@mui/material';
import '../styles/Rules.css';
import { Diversity2 } from '@mui/icons-material';

function Rules() {
    return <>
        <Grid container className="rules">
            <Grid item xs={12}>
                <div className="chtitle" id="rules">RULES</div>
            </Grid>
            <Grid item xs={10} md={5} className="left">
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
            

        </Grid >
    </>
}

export default Rules;