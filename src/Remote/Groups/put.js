export const putGroupsId$ = (sources) => {
  return sources.formData$
    .combineLatest(sources.config$, sources.groupId$,
      (formData, config, id) => ({config, formData, id})
    )
    .map(({config, formData, id}) => {
      return {
        url: config.api + '/groups/' + id,
        method: 'PUT',
        send: formData,
        category: 'putGroupsId$'
      }
    })
}
