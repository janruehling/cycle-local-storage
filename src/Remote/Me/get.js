export const getMe$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + '/me',
    method: 'GET',
    category: 'getMe$'
  }))
}

export const getMeNotifications$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + '/me/notifications',
    method: 'GET',
    category: 'getMeNotifications$'
  }))
}
