import { Box, Card, makeStyles } from "@material-ui/core"
import CardMedia from '@material-ui/core/CardMedia'
import React from "react"

const useStyles = makeStyles((theme) => ({
    root: {
        height: '500px'
    }
}))
function Map() {
    const classes = useStyles()

    return (
        <Box maxHeight={500} className={classes.root} bgcolor="secondary.main" p={4}>
            <Card className={classes.root}>
                <CardMedia
                    image="https://api.corona-zahlen.org/map/states"
                />
            </Card>

        </Box>
    )
}

export default Map
