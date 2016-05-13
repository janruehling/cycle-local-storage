const _getFilter = id => JSON.stringify({ plan: {id: id} })

export const getPlans$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + '/plans',
    method: 'GET',
    category: 'getPlans$'
  }))
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

export const getPlansLocations$ = ({planId$, config$}) => {
  return config$
    .combineLatest(planId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getPlansLocations$'
    }))
}

export const getPlansOrganizations$ = ({planId$, config$}) => {
  return config$
    .combineLatest(planId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/groups?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getPlansOrganizations$'
    }))
}

export const getPlansPractitioners$ = ({planId$, config$}) => {
  return config$
    .combineLatest(planId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/practitioners?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getPlansPractitioners$'
    }))
}
