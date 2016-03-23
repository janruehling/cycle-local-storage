import {Observable} from 'rx'
import {isEmpty} from 'ramda'

export default function model (actions$, sources) {
  const { HTTP, config$ } = sources
  const api$ = config$.map(config => config.api)

  const request$ = actions$.submitClicks$
    .filter(loginData => {
      return !isEmpty(loginData)
    })
    .flatMap(loginData => {
      return api$
        .flatMap(url => Observable
          .just({
            url: url + 'login',
            method: 'POST',
            send: {
              username: loginData.email,
              password: loginData.password
            }
          })
        )
    })

    const loginResponse$ = request$
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
    HTTP: request$,
    loginResponse$: loginResponse$
  }
}
