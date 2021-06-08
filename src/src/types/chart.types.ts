export type StatisticsProps = {
    cases: number
    recovered: number
    deaths: number   
}
export type AnalyticsListProps = {
    cases: Array<{cases:number,date: string}>
    recovered: Array<{recovered:number,date: string}>
    deaths: Array<{deaths:number,date: string}>
}
