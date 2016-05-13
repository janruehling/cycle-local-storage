import { Observable } from 'rx'

export const getGroups$ = ({config$, filter$}) => {
  filter$ = filter$ || Observable.just(null)
  return config$
    .combineLatest(filter$, (config, filter) => {
      const rootUrl = config.api + '/groups'
      const url = filter ? rootUrl + '?filter=' + encodeURI(JSON.stringify(filter)) : rootUrl
      return {
        url: url,
        method: 'GET',
        category: 'getGroups$'
      }
    })
}

export const getGroupsId$ = ({groupId$, config$}) => {
  return config$
    .combineLatest(groupId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/groups/' + id,
      method: 'GET',
      category: 'getGroupsId$'
    }))
}

export const getGroupsActivities$ = ({groupId$, config$}) => {
  return config$
    .combineLatest(groupId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/groups/' + id + '/activities',
      method: 'GET',
      category: 'getGroupsActivities$'
    }))
}
