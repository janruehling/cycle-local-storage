import { Observable } from 'rx'

let model = function ({HTTP, config$}) {
  const api$ = config$.map(config => config.api)
  const request$ = api$
    .flatMap(url => Observable
      .just({
        url: url + 'groups/1'
      })
  )

  const organization$ = request$
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
    organization$: organization$,
    HTTP: request$
  }
}

export default model
