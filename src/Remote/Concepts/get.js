export const getConceptByName$ = ({conceptName$, config$}) => {
  return config$
    .combineLatest(conceptName$, (config, name) => ({config, name}))
    .map(({config, name}) => ({
      url: config.api + '/concepts/' + name,
      method: 'GET',
      category: 'getConceptByName$' + name
    }))
}
