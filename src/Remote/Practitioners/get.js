export const getPractitioners$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + 'practitioners',
    method: 'GET'
  }))
}

export const getPractitionersId$ = ({practitionerId$, config$}) => {
  return config$
    .zip(practitionerId$)
    .map(([config, id]) => ({
    url: config.api + 'practitioners/' + id,
    method: 'GET'
  }))
}
