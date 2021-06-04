export enum Reference {
    Cases = "cases",
    Recovered = "recovered",
    Deaths = "deaths"
}

export type AggregateRequestResponse = {
    data: {
        [K in Reference]?: {
            total: number,
            list: Array<{
                [Reference.Cases]: number
                [Reference.Deaths]: number
                [Reference.Recovered]: number
                date: Date
            }>
        }
    },
    status: number 
}

export type ReferenceResult = {
    [Reference.Cases]?: number
    [Reference.Recovered]?: number
    [Reference.Deaths]?: number
    date: Date
}