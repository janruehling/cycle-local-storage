import { Observable } from 'rx'
import { Avatar } from 'StyleFn'

import intent from './intent'

export const Avatar$ = sources => {
  const actions$ = intent(sources)

  return {
    DOM: (sources.props$ || Observable.just({}))
      .combineLatest(actions$.hover$)
      .map(([props, hover]) => Avatar({
        ...props,
        isHover: hover
      })),
    value$: (sources.props$ || Observable.just({})).map(props => props.image),
    actions$
  }
}
