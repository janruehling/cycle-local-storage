import { Observable } from 'rx'

const ORGANIZATION_URL = 'http://localhost:3000/groups/1'

let model = function (sources) {
  const {HTTP} = sources

  let request$ = Observable
    .just({
      url: ORGANIZATION_URL
    })

  let organization$ = HTTP
    .filter(res$ => res$.request.url === ORGANIZATION_URL)
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
