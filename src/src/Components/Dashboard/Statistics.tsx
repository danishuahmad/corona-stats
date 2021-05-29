import * as React from 'react'
import { Paper } from '@material-ui/core'
import { StatisticsProps } from './types'

function Statistics({cases,recovered,deaths}: StatisticsProps) {
  return (
        <Paper>
            <div>
                <p>Total Cases</p> 
                <span>{cases}</span>
            </div>
            <div>
                <p>Total Recoveries</p> 
                <span>{recovered}</span>
            </div>
            <div>
                <p>Total Deaths</p> 
                <span>{deaths}</span>
            </div>
        </Paper>
    )
}

export default Statistics