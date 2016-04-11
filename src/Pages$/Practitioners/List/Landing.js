import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { getPractitioners$ } from 'Remote'

import { GridItem } from 'StyleFn'

import styles from './Landing.css'

const { just, merge } = Observable

const _render = ({
  practitioners
}) => div({
  className: styles.container
}, [
  practitioners.map(practitioner => GridItem({
    className: 'practitioner',
    width: '130px',
    style: {
      cursor: 'pointer'
    },
    attributes: {
      'data-id': practitioner.id
    },
    image: practitioner.image,
    gender: practitioner.gender,
    first_name: practitioner.first_name,
    last_name: practitioner.last_name
  }))
])

const _navActions = (sources) => merge(
  sources.DOM.select('.practitioner')
    .events('click')
    .map(ev => '/#/practitioners/' + ev.ownerTarget.dataset.id)
)

export default sources => {
  const route$ = _navActions(sources)
  const queue$ = getPractitioners$(sources)
    .startWith('')

  const response$ = queue$
    .map(request => request.url)
    .flatMap(url => {
      return sources.HTTP
        .filter(res$ => res$.request.url === url)
    })
    .mergeAll()
    .map(res => res.body)
    .catch(err => just(err))
    .startWith('')

  const practitioners = response$
    .map(data => data.practitioners)
    .filter(data => !!data)

  const viewState = {
    practitioners
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM,
    queue$,
    route$
  }
}
