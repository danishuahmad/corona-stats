import * as React from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core"
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
        minHeight: 140,
    },
});
function Statistics({ title, number, color }: NumberBoxProps) {
    const classes = useStyles()

    return (
            <Paper elevation={0} className={classes.paper} >
                <Typography
                    className={classes.title}
                    gutterBottom
                >
                    {title}
                </Typography>
                <Typography color={"inherit"} variant="h2" component="h2">
                    {number}
                </Typography>
            </Paper>
    )
}

export default Statistics
