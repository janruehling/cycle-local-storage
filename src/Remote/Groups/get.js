import { Observable } from 'rx'

const _getFilter = id => JSON.stringify({ group: {id: id} })

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

export const getGroupsRelations$ = ({groupId$, config$}) => {
  return config$
    .combineLatest(groupId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/groups/' + id + '/relations',
      method: 'GET',
      category: 'getGroupsRelations$'
    }))
}

export const getGroupsLocations$ = ({groupId$, config$}) => {
  return config$
    .combineLatest(groupId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/locations?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getGroupsLocations$'
    }))
}

export const getGroupsPractitioners$ = ({groupId$, config$}) => {
  return config$
    .combineLatest(groupId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/practitioners?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getGroupsPractitioners$'
    }))
}

export const getGroupsPlans$ = ({groupId$, config$}) => {
  return config$
    .combineLatest(groupId$, (config, id) => ({config, id}))
    .map(({config, id}) => ({
      url: config.api + '/plans?filter=' + encodeURI(_getFilter(id)),
      method: 'GET',
      category: 'getGroupsPlans$'
    }))
}
