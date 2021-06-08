export type FilterProps = {
    refresh: Function   
}
export type StatisticsProps = {
    cases: number | null
    recovered: number | null
    deaths: number | null   
}
export type RefreshProps = { 
    state?: string,
    days?: number,
    region?: string
}