import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Divider, Grid, Tooltip } from "@mui/material";

function Navbar() {
    return <>
        <Grid container>
            <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                <img className="logo" src="logo.png" color="white" />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <span className="page-title">The Grill</span>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2} display="flex" justifyContent="flex-end" alignItems="center" width="100%">
                <Tooltip title="Memes">
                    <EmojiEmotionsIcon />
                </Tooltip>
            </Grid>
        </Grid>
        <Divider />
    </>
}

export default Navbar;