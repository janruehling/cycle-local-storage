export const getInsuranceId$ = ({insuranceId$, config$}) => {
  return config$
    .combineLatest(insuranceId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/insurance_companies/' + id,
      method: 'GET',
      category: 'getInsuranceId$'
    }))
}

export const getInsuranceIdStats$ = ({insuranceId$, config$}) => {
  return config$
    .combineLatest(insuranceId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/insurance_companies/' + id + '/stats',
      method: 'GET',
      category: 'getInsuranceIdStats$'
    }))
}

export const getInsuranceIdActivities$ = ({insuranceId$, config$}) => {
  return config$
    .combineLatest(insuranceId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/insurance_companies/' + id + '/activities',
      method: 'GET',
      category: 'getInsuranceIdActivities$'
    }))
}
