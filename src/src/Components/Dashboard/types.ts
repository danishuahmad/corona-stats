export type FilterProps = {
    refresh: Function   
}
export type StatisticsProps = {
    cases: number | null
    recovered: number | null
    deaths: number | null   
}
export type AggregateRequestResponse = {
    data: {
        cases: number
        recovered: number
        deaths: number
    },
    status: number 
}