export const postGroups$ = ({config$, data$}) => config$
    .combineLatest(data$, (config, data) => ({config, data}))
    .map(({config, data}) => ({
      url: config.api + '/groups',
      method: 'POST',
      category: 'postGroups$',
      send: data
    }))
