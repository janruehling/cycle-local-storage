export const postPractitioners$ = ({config$, data$}) => config$
    .combineLatest(data$, (config, data) => ({config, data}))
    .map(({config, data}) => ({
      url: config.api + '/practitioners',
      method: 'POST',
      category: 'postPractitioners$',
      send: data
    }))
