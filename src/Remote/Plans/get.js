import { Observable } from 'rx'
import { getGroups$, getLocations$, getPractitioners$ } from 'Remote'

const _getFilter = id => ({ plan: {id: id} })

export const getPlans$ = ({config$, filter$}) => {
  filter$ = filter$ || Observable.just(null)
  return config$
    .combineLatest(filter$, (config, filter) => {
      const rootUrl = config.api + '/plans'
      const url = filter ? rootUrl + '?filter=' + encodeURI(JSON.stringify(filter)) : rootUrl
      return {
        url: url,
        method: 'GET',
        category: 'getPlans$'
      }
    })
}

export const getPlansId$ = ({planId$, config$}) => {
  return config$
    .combineLatest(planId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/plans/' + id,
      method: 'GET',
      category: 'getPlansId$'
    }))
}

export const getPlansActivities$ = ({planId$, config$}) => {
  return config$
    .combineLatest(planId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/plans/' + id + '/activities',
      method: 'GET',
      category: 'getPlansActivities$'
    }))
}

export const getPlansRelations$ = ({planId$, config$}) => {
  return config$
    .combineLatest(planId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/plans/' + id + '/relations',
      method: 'GET',
      category: 'getPlansRelations$'
    }))
}

export const getPlansLocations$ = ({ planId$, config$ }) => {
  return planId$
    .flatMap(planId => getLocations$({
      config$,
      filter$: Observable.just(_getFilter(planId))
    }))
}

export const getPlansGroups$ = ({ planId$, config$ }) => {
  return planId$
    .flatMap(planId => getGroups$({
      config$,
      filter$: Observable.just(_getFilter(planId))
    }))
}

export const getPlansPractitioners$ = ({ planId$, config$ }) => {
  return planId$
    .flatMap(planId => getPractitioners$({
      config$,
      filter$: Observable.just(_getFilter(planId))
    }))
}
