import { Observable } from 'rx'
import R from 'ramda'
import { div, button, a } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import {nestedComponent, mergeOrFlatMapLatest} from 'util'

import { getPractitionersId$ } from 'Remote'

import { Avatar } from 'StyleFn'

const { just } = Observable

const _render = ({
  practitioner
}) => just(div([
  practitioner.first_name,
  Avatar({
    image: R.pathOr(null, ['image', 'url'])(practitioner),
    gender: practitioner.gender.toLowerCase()
  })
]))

export default sources => {

  const queue$ = getPractitionersId$(sources)
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

  const practitioner = response$
    .map(data => data.practitioner)
    .filter(data => !!data)

  const viewState = {
    practitioner
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM,
    queue$
  }
}
