import * as React from "react";
import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { NumberBoxProps } from "../../types/statistics.types"

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        height: 140,
        width: 100,
    },
});
function Statistics({ title, number, color }: NumberBoxProps) {
    const classes = useStyles()

    return (
        <Grid item>
            <Paper elevation={0} className={classes.paper} >
                <Typography
                    className={classes.title}
                    color="secondary"
                    gutterBottom
                >
                    {title}
                </Typography>
                <Typography color={"inherit"} variant="h5" component="h2">
                    {number}
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Statistics;
