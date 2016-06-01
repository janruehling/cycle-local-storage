export const postImages$ = ({config$, data$}) => config$
    .combineLatest(data$, (config, data) => ({config, data}))
    .map(({config, data}) => ({
      url: config.api + '/images',
      method: 'POST',
      category: 'postImages$',
      send: data,
      type: null
    }))
