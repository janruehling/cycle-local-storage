import { Observable } from 'rx'

let model = function ({HTTP, config$}) {
  const api$ = config$.map(config => config.api)
  const request$ = api$
    .flatMap(url => Observable
      .just({
        url: url + 'profile'
      })
    )

  const profile$ = request$
    .map(request => request.url)
    .flatMap(url => {
      return HTTP
        .filter(res$ => res$.request.url === url)
    })
    .mergeAll()
    .map(res => res.body)
    .startWith('')
    .share()

  return {
    profile$: profile$,
    HTTP: request$
  }
}

export default model
