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
