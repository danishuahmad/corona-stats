import { Select, MenuItem, InputLabel, Box, Grid, makeStyles, createStyles, Theme } from '@material-ui/core'
import { FilterProps } from './types'
import GermanStates from '../../../config/de.states.json'
import { useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        select: {
            width: '100%',
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
    const defaultTime = {days:365,name:"Since Beginning"}    

    //  setup local state
    const [selectedArea, selectArea] = useState<string>(defaultArea.code)
    const [selectedTimeRange, selectTimeRange] = useState<number | null>(defaultTime.days)

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
        <Box bgcolor="secondary.main" p={4}>
            <Grid container justify="flex-end" spacing={2}>
                <Grid item lg={4} xs={12}>
                    <InputLabel id="demo-simple-select-label">Region</InputLabel>
                    <Select
                        className={classes.select}
                        value={selectedArea}
                        inputProps={{MenuProps: {disableScrollLock: true}}}
                        onChange={event=>updateFilters({area: `${event.target.value}`})}
                    >
                        <MenuItem value={defaultArea.code}>{defaultArea.name}</MenuItem>
                        {
                            GermanStates.map( germanState => 
                                <MenuItem
                                    key={`area-${germanState.code}`} 
                                    value={germanState.code}
                                >
                                    {germanState.name}
                                </MenuItem>
                            )
                        }
                    </Select>
                </Grid>
                <Grid item lg={4} xs={12}>
                    <InputLabel id="demo-simple-select-label">Time Range</InputLabel>
                    <Select
                        className={classes.select}
                        inputProps={{MenuProps: {disableScrollLock: true}}}
                        value={selectedTimeRange ?? ''}
                        onChange={
                            event=> updateFilters({timeRange: Number(`${event.target.value}`) })
                        }
                    >
                        <MenuItem value={defaultTime.days}>{defaultTime.name}</MenuItem>
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
            </Grid>
           
        </Box>
    )
}

export default Filter;
