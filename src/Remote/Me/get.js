export const getMe$ = ({config$}) => {
  return config$.map(config => ({
    url: config.api + '/me',
    method: 'GET',
    category: 'getMe$'
  }))
}
