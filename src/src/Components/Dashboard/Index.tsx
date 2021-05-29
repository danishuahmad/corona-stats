import Statistics from "./Statistics"
import Filter from "./Filter"
import { useEffect, useState } from "react"
import {createStyles, Grid,makeStyles,Theme} from "@material-ui/core" 
import { getAggregateStatistics, getSeparateStatistics } from "../../dataProvider/dashboard.provider"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        }
    }),
)

function App() {

    //  setup local state
    const [cases, setCases] = useState<number|null>(null)
    const [recovered, setRecoveries] = useState<number|null>(null)
    const [deaths, setDeaths] = useState<number|null>(null)

    //  functions
    const getData = async ({state,days}:{state?:string,days?:number}) => {

        //  check if our resource is state specific or for whole country
        const resource = state ? `states/${state}` : 'germany'

        //  parse time range
        let data
        if( days ){
            data = await getSeparateStatistics({resource,days,state})
        }else{
            data = await getAggregateStatistics({resource,state})
        }
        if( data ){
            const {cases,recovered,deaths} = data
            setCases(cases)
            setRecoveries(recovered)
            setDeaths(deaths)
        }
    }
    
    //  hooks
    useEffect(() => {
        getData({})
    },[])
    const classes = useStyles()

  return (


    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>      
            <Filter refresh={getData}/>
        </Grid>
        <Grid item xs={6}>
            <Statistics cases={cases} recovered={recovered} deaths={deaths} />
        </Grid>
        <Grid item xs={6}>
            <Statistics cases={cases} recovered={recovered} deaths={deaths} />
        </Grid>
      </Grid>
    </div>
    
  );
}

export default App;
