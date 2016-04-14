export const getInsuranceId$ = ({insuranceId$, config$}) => {
  return config$
    .zip(insuranceId$)
    .map(([config, id]) => ({
      url: config.api + 'insurance_companies/' + id,
      method: 'GET'
    }))
}

export const getInsuranceIdStats$ = ({insuranceId$, config$}) => {
  return config$
    .zip(insuranceId$)
    .map(([config, id]) => ({
      url: config.api + 'insurance_companies/' + id + '/stats',
      method: 'GET'
    }))
}
