export const getGroups$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + 'groups',
    method: 'GET'
  }))
}

export const getGroupsId$ = ({groupId$, config$}) => {
  return config$
    .combineLatest(groupId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + 'groups/' + id,
      method: 'GET'
    }))
}
