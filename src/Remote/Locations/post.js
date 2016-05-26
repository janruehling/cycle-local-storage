export const postLocations$ = ({config$, data$}) => config$
    .combineLatest(data$, (config, data) => ({config, data}))
    .map(({config, data}) => ({
      url: config.api + '/locations',
      method: 'POST',
      category: 'postLocations$',
      send: data
    }))
