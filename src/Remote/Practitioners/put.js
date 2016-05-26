export const putPractitionersId$ = (sources) => {
  return sources.formData$
    .combineLatest(sources.config$, sources.practitionerId$,
      (formData, config, id) => ({config, formData, id})
    )
    .map(({config, formData, id}) => {
      return {
        url: config.api + '/practitioners/' + id,
        method: 'PUT',
        send: formData,
        category: 'putPractitionersId$'
      }
    })
}
