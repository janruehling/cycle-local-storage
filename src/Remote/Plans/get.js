export const getPlans$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + 'plans',
    method: 'GET'
  }))
}

export const getPlansId$ = ({planId$, config$}) => {
  return config$
    .zip(planId$)
    .map(([config, id]) => ({
      url: config.api + 'plans/' + id,
      method: 'GET'
    }))
}
