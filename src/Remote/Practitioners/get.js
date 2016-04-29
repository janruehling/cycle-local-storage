const _getFilter = id => JSON.stringify({practitioners:{id:id}})

export const getPractitioners$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + '/practitioners',
    method: 'GET'
  }))
}

export const getPractitionersId$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/practitioners/' + id,
      method: 'GET'
    }))
}

export const getPractitionersLocations$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations?filter=' + encodeURI(_getFilter(id)),
      method: 'GET'
    }))
}

export const getPractitionersOrganizations$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/groups?filter=' + encodeURI(_getFilter(id)),
      method: 'GET'
    }))
}

export const getPractitionersPlans$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/plans?filter=' + encodeURI(_getFilter(id)),
      method: 'GET'
    }))
}
