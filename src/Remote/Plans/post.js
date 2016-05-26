export const postPlans$ = ({config$, data$}) => config$
    .combineLatest(data$, (config, data) => ({config, data}))
    .map(({config, data}) => ({
      url: config.api + '/plans',
      method: 'POST',
      category: 'postPlans$',
      send: data
    }))
