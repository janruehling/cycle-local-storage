import { Observable } from 'rx'
import { is } from 'ramda'

export const isObservable = obs => {
  if (!is(Object, obs)) return false
  return typeof obs.subscribe === 'function'
}

export function nestedComponent (match$, sources) {
  const pluckFlat = function (key) {
    return this.flatMapLatest(obj => obj[key] || Observable.never())
  }

  const component = match$.map(({path, value}) => {
    return value({...sources, router: sources.router.path(path)})
  }).shareReplay(1)

  component.pluckFlat = pluckFlat.bind(component)

  return component
}

export const mergeOrFlatMapLatest = (prop, ...sourceArray) =>
  Observable.merge(
    sourceArray.map(src =>
      isObservable(src)
        ? src.flatMapLatest(l => l[prop] || Observable.empty()) // flatmap if observable
        : src[prop] || Observable.empty() // otherwise look for a prop
    )
  )

export const log = label => emitted => console.log(label, ':', emitted)
