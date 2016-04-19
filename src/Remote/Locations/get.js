export const getLocations$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + 'locations',
    method: 'GET'
  }))
}

export const getLocationsId$ = ({locationId$, config$}) => {
  return config$
    .combineLatest(locationId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + 'locations/' + id,
      method: 'GET'
    }))
}
