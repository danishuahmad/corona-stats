import * as React from "react";
import { Grid, Divider } from "@material-ui/core"
import { StatisticsProps } from "../../types/statistics.types"
import NumberBox from "./NumberBox";

function Statistics({ cases, recovered, deaths }: StatisticsProps) {

    return (
        <Grid container justify="space-between" alignItems="center" spacing={2}>
            <NumberBox 
                title={"Cases"} 
                number={cases} 
                color={'primary'} 
            />
            <Divider orientation="vertical" flexItem />
            <NumberBox 
                title={"Recovered"} 
                number={recovered} 
                color={'seconday'} 
            />
            <Divider orientation="vertical" flexItem />
            <NumberBox 
                title={"Deaths"} 
                number={deaths} 
                color={'error'} 
            />
        </Grid>
    );
}

export default Statistics
