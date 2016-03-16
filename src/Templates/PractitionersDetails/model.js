import { Observable } from 'rx'

const PRACTITIONER_URL = 'http://localhost:3000/practitioners/1'

let model = function (sources) {
  const {HTTP} = sources

  let request$ = Observable
    .just({
      url: PRACTITIONER_URL
    })

  let practitioner$ = HTTP
    .filter(res$ => res$.request.url === PRACTITIONER_URL)
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
