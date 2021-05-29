import { Select, MenuItem, InputLabel, Paper, Grid, makeStyles, createStyles, Theme } from '@material-ui/core'
import { FilterProps } from './types'
import DeutschStates from '../../../config/de.states.json'
import { useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            padding: `${theme.spacing()*3}px 0`
        },
        select: {
            width: '100%'
        }
    }),
)
function Filter({refresh}:FilterProps) {

    const availableTimeRanges = [
        {
            days: 7,
            label: 'Since Last 1 Week'
        },
        {
            days: 14,
            label: 'Since Last 2 Week'
        },
        {
            days: 21,
            label: 'Since Last 3 Week'
        },
        {
            days: 28,
            label: 'Since Last 4 Week'
        }
    ]
    const defaultArea = {code:"DE",name:"All German States"}    

    //  setup local state
    const [selectedArea, selectArea] = useState<string>(defaultArea.code)
    const [selectedTimeRange, selectTimeRange] = useState<number | null>(null)

    //  local functions
    const updateFilters = async ({area,timeRange}:{
        area?: string
        timeRange?: number
    }) => {
        /*  we have to mutate this object with current provided 
            value as setState is synchronous in nature hence we cannot
            rely on state data
        */
        const requestData: {
            state: string | undefined
            days: number | undefined
        } = {
            state: selectedArea, days: selectedTimeRange ?? undefined
        }

        if( area ){
            requestData.state = area
            await selectArea(area)
        }else if(timeRange){
            requestData.days = timeRange
            await selectTimeRange(timeRange)
        }
        if( requestData.state === defaultArea.code ){
            requestData.state = undefined
        }
        refresh(requestData)
    }

    //  hooks
    const classes = useStyles()


    return (
        <Paper className={classes.root}>

            <Grid item xs={6}>
                <InputLabel id="demo-simple-select-label">Region</InputLabel>
                <Select
                    className={classes.select}

                    id="demo-simple-select"
                    value={selectedArea}
                    onChange={event=>updateFilters({area: `${event.target.value}`})}
                >
                    <MenuItem value={defaultArea.code}>{defaultArea.name}</MenuItem>
                    {
                        DeutschStates.map( deutschState => 
                            <MenuItem
                                key={`area-${deutschState.code}`} 
                                value={deutschState.code}
                            >
                                {deutschState.name}
                            </MenuItem>
                        )
                    }
                </Select>
            </Grid>
            <Grid item xs={6}>
                <InputLabel id="demo-simple-select-label">Time Range</InputLabel>
                <Select
                    className={classes.select}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTimeRange ?? ''}
                    onChange={
                        event=> updateFilters({timeRange: Number(`${event.target.value}`) })
                    }
                >
                    {
                        availableTimeRanges.map( timeRange => 
                            <MenuItem 
                                key={`date-${timeRange.days}`} 
                                value={timeRange.days}
                            >
                                {timeRange.label}
                            </MenuItem>
                        )
                    }
                </Select>
            </Grid>
        </Paper>
    )
}

export default Filter;
