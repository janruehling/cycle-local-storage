import { Observable } from 'rx'

const PROFILE_URL = 'http://localhost:3000/profile'

let model = function (HTTP) {
  let request$ = Observable
    .just({
      url: PROFILE_URL
    })

  let profile$ = HTTP
    .filter(res$ => res$.request.url === PROFILE_URL)
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
