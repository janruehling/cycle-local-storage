import { Observable } from 'rx'

const LOCATION_URL = 'http://localhost:3000/locations/1'

let model = function (sources) {
  const {HTTP} = sources

  let request$ = Observable
    .just({
      url: LOCATION_URL
    })

  let location$ = HTTP
    .filter(res$ => res$.request.url === LOCATION_URL)
    .mergeAll()
    .map(res => res.body)
    .startWith('')
    .share()

  return {
    location$: location$,
    HTTP: request$
  }
}

export default model
