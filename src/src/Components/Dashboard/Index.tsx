import { useEffect, useState } from "react"
import Chart from "../Chart/Index"
import Filter from "./Filter"
import { Card, Grid, makeStyles } from "@material-ui/core"
import Map from "../Map/Index"
import Statistics from "../Satistics/Index"
import { getStatistics } from "../../dataProvider/dashboard.provider"
import {AnalyticsListProps} from '../../types/chart.types'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2), //grid padding
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))
function Dashboard() {

    const classes = useStyles()

    //  setup local state
    const [cases, setCases] = useState<number>(0)
    const [recovered, setRecoveries] = useState<number>(0)
    const [deaths, setDeaths] = useState<number>(0)

    const [analyticsList, setAnalyticsList] = useState<AnalyticsListProps>({
        cases: [],
        recovered: [],
        deaths: []
    })

    //  functions
    const getData = async ({ state, days }: { state?: string, days?: number }) => {
        //  parse time range
        let data = await getStatistics({ days: (days??365), state })
        if (data) {

            const { cases, recovered, deaths } = data
            setCases(cases?.total ?? 0)
            setRecoveries(recovered?.total ?? 0)
            setDeaths(deaths?.total ?? 0)

            //  set analytics
            setAnalyticsList({
                cases: cases?.list ?? [],
                recovered: recovered?.list ?? [],
                deaths: deaths?.list ?? []
            })
        }
    }

    //  hooks
    useEffect(() => {
        getData({})
    }, [])

    return (
        <Grid container spacing={3} className={classes.paper}>
            <Grid item xs={12}>
                <Filter refresh={getData} />
            </Grid>
            <Grid item xs={12}>
                <Statistics cases={cases} recovered={recovered} deaths={deaths} />
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <Map/>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Chart analyticsList={analyticsList}/>
            </Grid>
        </Grid>
    )
}

export default Dashboard
