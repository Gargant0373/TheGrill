import { Grid, Paper } from "@mui/material";
import "../styles/PostArea.css"

function PostArea(props: { marginTop: string }) {
    return <>
        <Grid container xs={12} marginTop={props.marginTop}>
            <Grid xs={1} md={2} />
            <Grid container xs={10} md={8} spacing={2}>
                <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                    <Post post={{
                        title: "The Grill",
                        description: "Ah, the Grill, a sacred and surreal gathering that transcends the boundaries of mere celebration. It stands as a magnificent testament to the glorious camaraderie and unbounded creativity of the class of '25 from TU Delft CSE. Like a mythical creature, the Grill emerges from the depths of our collective consciousness, beckoning us to partake in its enigmatic splendor.",
                        imageUrl: "https://images.unsplash.com/photo-1598514013891-7f6b5b9d0c2b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlJTIwZ3JpbGwlMjB3aXRoJTIwYm9hcmQlMjBhbmQlMjB0aGUlMjBjaXR5JTIwY2l0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    }} />
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                    <Post post={{
                        title: "Rules",
                        description: "- One must not leave trash behind.\n- One must help a brother in need of an extra pair of hands.\n- One shall never leave a beer unfinished.\n- One shall bring his own meat.",
                        imageUrl: "https://images.unsplash.com/photo-1598514013891-7f6b5b9d0c2b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlJTIwZ3JpbGwlMjB3aXRoJTIwYm9hcmQlMjBhbmQlMjB0aGUlMjBjaXR5JTIwY2l0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                    }} />
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                    <img src="grill1.jpg" className="post-image" />
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                    <img src="grill2.jpg" className="post-image" />
                </Grid>
            </Grid>
            <Grid xs={1} md={2} />
        </Grid>
    </>
}

function Post(props: { post: PostProps }) {
    return <>
        <Grid container width="100%" height="100%" >
            <Paper className="post-paper">
                <Grid item xs={12}>
                    <p className="heading">{props.post.title}</p>
                </Grid>
                <Grid item xs={12}>
                    <p className="post-text">{props.post.description}</p>
                </Grid>
            </Paper>
        </Grid>
    </>
}

interface PostProps {
    title: string;
    description: string;
    imageUrl: string | null;
}

export default PostArea;