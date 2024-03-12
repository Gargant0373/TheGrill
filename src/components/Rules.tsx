import { Grid } from '@mui/material';
import '../styles/Rules.css';

function Rules() {
    return <>
        <Grid container className="rules">
            <Grid item xs={12}>
                <div className="chtitle" id="rules">RULES</div>
            </Grid>
        </Grid>
    </>
}

export default Rules;