import * as React from "react";
import { Grid, Divider, Box, Typography, Hidden } from "@material-ui/core"
import { StatisticsProps } from "../../types/statistics.types"
import NumberBox from "./NumberBox";

function Statistics({ cases, recovered, deaths }: StatisticsProps) {

    return (
        <Box bgcolor="secondary.main" p={4}>
            <Grid container justify="space-between" alignItems="center" spacing={2}>
                <Hidden mdDown>
                    <Grid item lg={4}>
                        <Typography color={"inherit"} variant="h4" component="h2">
                            All Over Germany
                        </Typography>
                    </Grid>
                </Hidden>
                <Grid container lg={8}>
                    <Grid item lg={4} xs={12}>
                        <NumberBox 
                            title={"Cases"} 
                            number={cases} 
                            color={'primary'} 
                        />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Divider orientation="vertical" flexItem />
                        <NumberBox 
                            title={"Recovered"} 
                            number={recovered} 
                            color={'seconday'} 
                        />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <Divider orientation="vertical" flexItem />
                        <NumberBox 
                            title={"Deaths"} 
                            number={deaths} 
                            color={'error'} 
                        />
                    </Grid>
                </Grid>
                
            </Grid>
        </Box>
    );
}

export default Statistics
