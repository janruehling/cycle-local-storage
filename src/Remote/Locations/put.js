export const putLocationsId$ = (sources) => {
  return sources.formData$
    .combineLatest(sources.config$, sources.locationId$,
      (formData, config, id) => ({config, formData, id})
    )
    .map(({config, formData, id}) => {
      return {
        url: config.api + '/locations/' + id,
        method: 'PUT',
        send: formData,
        category: 'putLocationsId$'
      }
    })
}
