import { useEffect, useState } from "react"
import Chart from "../Chart/Index"
import Filter from "./Filter"
import { Card, Grid } from "@material-ui/core"
import Map from "../Map/Index"
import Statistics from "../Satistics/Index"
import { getSeparateStatistics } from "../../dataProvider/dashboard.provider"

function Dashboard() {

    //  setup local state
    const [cases, setCases] = useState<number>(0)
    const [recovered, setRecoveries] = useState<number>(0)
    const [deaths, setDeaths] = useState<number>(0)

    //  functions
    const getData = async ({ state, days }: { state?: string, days?: number }) => {
        //  parse time range
        let data = await getSeparateStatistics({ days: (days??365), state })
        if (data) {
            const { cases, recovered, deaths } = data
            setCases(cases?.total ?? 0)
            setRecoveries(recovered?.total ?? 0)
            setDeaths(deaths?.total ?? 0)
        }
    }

    //  hooks
    useEffect(() => {
        getData({})
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Filter refresh={getData} />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <Statistics cases={cases} recovered={recovered} deaths={deaths} />
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <Map/>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Chart/>
            </Grid>
        </Grid>
    )
}

export default Dashboard
