export const getGroups$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + 'groups',
    method: 'GET'
  }))
}

export const getGroupsId$ = ({groupId$, config$}) => {
  return config$
    .zip(groupId$)
    .map(([config, id]) => ({
      url: config.api + 'groups/' + id,
      method: 'GET'
    }))
}
