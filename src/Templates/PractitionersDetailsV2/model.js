import { Observable } from 'rx'

let model = function ({HTTP, config$, props$}) {
  const api$ = config$.map(config => config.api)

  const request$ = api$
    .zip(props$)
    .map(([url, props]) => {
      return {
        url: url,
        id: props.id
      }
    })
    .flatMap(options => Observable
      .just({
        url: options.url + 'practitioners/' + options.id
      })
  )

  const practitioner$ = request$
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
    practitioner$: practitioner$,
    HTTP: request$
  }
}

export default model
