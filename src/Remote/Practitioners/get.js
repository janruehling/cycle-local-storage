import { Observable } from 'rx'

const _getFilter = id => JSON.stringify({ practitioner: {id: id} })

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

export const getPractitionersLocations$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getPractitionersLocations$'
    }))
}

export const getPractitionersOrganizations$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/groups?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getPractitionersOrganizations$'
    }))
}

export const getPractitionersPlans$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/plans?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getPractitionersPlans$'
    }))
}
