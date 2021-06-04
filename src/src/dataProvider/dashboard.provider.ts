import { get } from "./index"
import { AggregateRequestResponse, ReferenceResult, Reference } from "./types/dashboardProvider.type"

/** Requests `cases`, `recoveries` and `deaths` separately for given date-range*/
export const getSeparateStatistics = 
    async ({days,state}:{days:number,state:string | undefined}):
    Promise<AggregateRequestResponse['data'] | null> => 
{

    const resource = state ? `state/${state}` : `germany`
    const requests = {
        [Reference.Cases]: get(`${resource}/history/cases/${days}`),
        [Reference.Recovered]: get(`${resource}/history/recovered/${days}`),
        [Reference.Deaths]: get(`${resource}/history/deaths/${days}`),
    }

    return Promise.all(Object.values(requests)).then((results) => {
        const dataPath = state ? `data.${state}.history` : `data`
        return Object.keys(requests).reduce( (acc,key,index) => {
            return {
                ...acc,
                [key]: {
                    total: results[index].data[dataPath].reduce(totalFigures,0),
                    list: results[index].data[dataPath]
                }
            }
        },{})
    }).catch(e => {
        return {}
    })
}

const totalFigures = (acc:number,iterator:ReferenceResult) => {
    const figure = iterator[Reference.Cases] ? iterator[Reference.Cases]
                    :iterator[Reference.Recovered] ? iterator[Reference.Recovered]
                     :iterator[Reference.Deaths] ? iterator[Reference.Deaths] : 0
    return Number(acc)+Number(figure)
}