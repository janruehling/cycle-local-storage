import { Observable } from 'rx'
import { getGroups$, getPlans$, getPractitioners$ } from 'Remote'

const _getFilter = id => ({ location: {id: id} })

export const getLocations$ = ({config$, filter$}) => {
  filter$ = filter$ || Observable.just(null)
  return config$
    .combineLatest(filter$, (config, filter) => {
      const rootUrl = config.api + '/locations'
      const url = filter ? rootUrl + '?filter=' + encodeURI(JSON.stringify(filter)) : rootUrl
      return {
        url: url,
        method: 'GET',
        category: 'getLocations$'
      }
    })
}

export const getLocationsId$ = ({locationId$, config$}) => {
  return config$
    .combineLatest(locationId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations/' + id,
      method: 'GET',
      category: 'getLocationsId$'
    }))
}

export const getLocationsActivities$ = ({locationId$, config$}) => {
  return config$
    .combineLatest(locationId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations/' + id + '/activities',
      method: 'GET',
      category: 'getLocationsActivities$'
    }))
}

export const getLocationsRelations$ = ({locationId$, config$}) => {
  return config$
    .combineLatest(locationId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations/' + id + '/relations',
      method: 'GET',
      category: 'getLocationsRelations$'
    }))
}

export const getLocationsPractitioners$ = ({ locationId$, config$ }) => {
  return locationId$
    .flatMap(locationId => getPractitioners$({
      config$,
      filter$: Observable.just(_getFilter(locationId))
    }))
}

export const getLocationsPlans$ = ({ locationId$, config$ }) => {
  return locationId$
    .flatMap(locationId => getPlans$({
      config$,
      filter$: Observable.just(_getFilter(locationId))
    }))
}

export const getLocationsGroups$ = ({ locationId$, config$ }) => {
  return locationId$
    .flatMap(locationId => getGroups$({
      config$,
      filter$: Observable.just(_getFilter(locationId))
    }))
}
