export const putPlansId$ = (sources) => {
  return sources.formData$
    .combineLatest(sources.config$, sources.planId$,
      (formData, config, id) => ({config, formData, id})
    )
    .map(({config, formData, id}) => {
      return {
        url: config.api + '/plans/' + id,
        method: 'PUT',
        send: formData,
        category: 'putPlansId$'
      }
    })
}
