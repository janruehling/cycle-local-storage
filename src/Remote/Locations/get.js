export const getLocations$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + '/locations',
    method: 'GET',
    category: 'getLocations$'
  }))
}

export const getLocationsId$ = ({locationId$, config$}) => {
  return config$
    .combineLatest(locationId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations/' + id,
      method: 'GET',
      category: 'getLocationsId$'
    }))
}

export const getLocationsActivities$ = ({locationId$, config$}) => {
  return config$
    .combineLatest(locationId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations/' + id + '/activities',
      method: 'GET',
      category: 'getLocationsActivities$'
    }))
}

export const getLocationsPractitioners$ = ({locationId$, config$}) => {
  return config$
    .combineLatest(locationId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/practitioners?filter=' + encodeURIComponent({
        locations: {
          id: id
        }
      }),
      method: 'GET',
      category: 'getLocationsPractitioners$'
    }))
}
