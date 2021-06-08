import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Box } from "@material-ui/core"
import { AnalyticsListProps } from "../../types/chart.types"

function Chart({ analyticsList }: { analyticsList: AnalyticsListProps }) {

    const data = analyticsList.cases.map((value, index) => {
        return {
            date: value.date,
            cases: value.cases,
            deaths: analyticsList.deaths[index].deaths,
            recovered: analyticsList.recovered[index].recovered
        }
    })

    return (
        <Box bgcolor="secondary.main" p={4}>
            <ResponsiveContainer width="100%" height={500}>
                <AreaChart data={data}>
                    <XAxis tick={false} axisLine={false} dataKey="date" />
                    <YAxis axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="recovered" stackId="1" stroke="#2ecc71" fill="#2ecc71" />
                    <Area type="monotone" dataKey="deaths" stackId="1" stroke="#c0392b" fill="#c0392b" />
                    <Area type="monotone" dataKey="cases" stackId="1" stroke="#d35400" fill="#d35400" />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default Chart
