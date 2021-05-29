import { get } from "./index"
import { AggregateRequestResponse } from "../Components/Dashboard/types"

/** Requests `cases`, `recoveries` and `deaths` separately for given date-range*/
export const getSeparateStatistics = 
    async ({resource,days,state}:{resource:string,days:number,state:string | undefined}):
    Promise<AggregateRequestResponse['data'] | null> => 
{
    const requests = [
        get(`${resource}/history/cases/${days}`),
        get(`${resource}/history/recovered/${days}`),
        get(`${resource}/history/deaths/${days}`),
    ]

    return Promise.all(requests).then((results) => {
        console.log(results)
        if( state ){
            //  TODO simply this
            console.log(
                results[1],
                results[1].data,
                results[1].data.data[state]
            )
            const cases = results[0].data.data[state].history.reduce((
                acc:number,
                iter:{cases:number}
            ) => (Number(acc)+Number(iter.cases)),0)
            const recovered = results[1].data.data[state].history.reduce((
                acc:number,
                iter:{recovered:number}
            ) => (Number(acc)+Number(iter.recovered)),0)
            const deaths = results[2].data.data[state].history.reduce((
                acc:number,
                iter:{deaths:number}
            ) => (Number(acc)+Number(iter.deaths)),0)

            return {cases,deaths,recovered}
            
        }
        //  TODO simply this
        const cases = results[1].data.data.reduce((
            acc:number,
            iter:{cases:number}
        ) => (Number(acc)+Number(iter.cases)),0)
        const recovered = results[1].data.data.reduce((
            acc:number,
            iter:{recovered:number}
        ) => (Number(acc)+Number(iter.recovered)),0)
        const deaths = results[1].data.data.reduce((
            acc:number,
            iter:{deaths:number}
        ) => (Number(acc)+Number(iter.deaths)),0)

        return {cases,deaths,recovered}
    }).catch(e => {
        return null
    })
}

/** Requests `cases`, `recoveries` and `deaths` collectively since the start of pandemic*/
export const getAggregateStatistics = 
    async ({resource,state}:{resource:string,state: string | undefined}): 
    Promise<AggregateRequestResponse['data'] | null> =>
{
    return get(resource).then((result) => {

        if( state ){
            //  response of state resource is nested in state key
            const {cases,deaths,recovered} = result.data.data[state]
            return {cases,deaths,recovered}
        }
        let {cases,deaths,recovered} =result.data
        return {cases,deaths,recovered}
    }).catch(e => {
        return null
    })
}
