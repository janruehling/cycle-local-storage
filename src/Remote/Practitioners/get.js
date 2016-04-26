export const getPractitioners$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + '/practitioners',
    method: 'GET'
  }))
}

export const getPractitionersId$ = ({practitionerId$, config$}) => {
  return config$
    .combineLatest(practitionerId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/practitioners/' + id,
      method: 'GET'
    }))
}
