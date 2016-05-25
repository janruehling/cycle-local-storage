import { Observable } from 'rx'
import { getLocations$, getGroups$, getPlans$ } from 'Remote'

const _getFilter = id => ({ practitioner: {id: id} })

export const getPractitioners$ = ({config$, filter$}) => {
  filter$ = filter$ || Observable.just(null)
  return config$
    .combineLatest(filter$, (config, filter) => {
      const rootUrl = config.api + '/practitioners'
      const url = filter ? rootUrl + '?filter=' + encodeURI(JSON.stringify(filter)) : rootUrl
      return {
        url: url,
        method: 'GET',
        category: 'getPractitioners$'
      }
    })
}

export const getPractitionersId$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/practitioners/' + id,
      method: 'GET',
      category: 'getPractitionersId$'
    }))
}

export const getPractitionersIdActivities$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/practitioners/' + id + '/activities',
      method: 'GET',
      category: 'getPractitionersIdActivities$'
    }))
}

export const getPractitionersRelations$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/practitioners/' + id + '/relations',
      method: 'GET',
      category: 'getPractitionersRelations$'
    }))
}

export const getPractitionersLocations$ = ({ practitionerId$, config$ }) => {
  return practitionerId$
    .flatMap(practitionerId => getLocations$({
      config$,
      filter$: Observable.just(_getFilter(practitionerId))
    }))
}

export const getPractitionersGroups$ = ({ practitionerId$, config$ }) => {
  return practitionerId$
    .flatMap(practitionerId => getGroups$({
      config$,
      filter$: Observable.just(_getFilter(practitionerId))
    }))
}

export const getPractitionersPlans$ = ({ practitionerId$, config$ }) => {
  return practitionerId$
    .flatMap(practitionerId => getPlans$({
      config$,
      filter$: Observable.just(_getFilter(practitionerId))
    }))
}
