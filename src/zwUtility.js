import { Observable } from 'rx'
import { is, pathOr } from 'ramda'

export const toTitleCase = str => {
  return window.String(str).split('_').join(' ').split('.').join('. ').replace(/([^\W_]+[^\s-]*) */g, s =>
      s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
    )
}

export const byMatch = (matchPattern) =>
  (responses$) => (pathOr('', ['request', 'url'])(responses$)).indexOf(matchPattern) > -1

export const getName = (entity) => {
  if (!is(Object, entity)) return ''

  if (entity.name) {
    return entity.name.trim()
  } else if (entity.first_name || entity.middle_name || entity.last_name) {
    const first = entity.first_name ? entity.first_name + ' ' : ''
    const middle = entity.middle_name ? entity.middle_name + ' ' : ''
    const last = entity.last_name ? entity.last_name + ' ' : ''

    return (first + middle + last).trim()
  } else {
    return ''
  }
}

export const getIcon = (entity, type = '') => {
  let icon = ''

  if (!is(Object, entity)) return icon

  switch (type) {
    case 'practitioners':
    case 'practitioner':
      icon = entity.gender ? toTitleCase(entity.gender) : 'Male'
      break
    case 'locations':
    case 'location':
      icon = 'Hospital'
      break
    case 'groups':
    case 'group':
      icon = 'Shield'
      break
    case 'plans':
    case 'plan':
      icon = 'Sheet'
      break
    default:
      icon = ''
  }

  return icon
}

export const getStaticMap = ({latitude, longitude, width, height, zoom}) => {
  if (!latitude || !longitude) return null
  width = width || 130
  height = height || 130
  zoom = zoom || 15

  return 'https://maps.googleapis.com/maps/api/staticmap?markers=size:small%7Ccolor:red%7c' +
    latitude + ',' +
    longitude +
    '&zoom=' + zoom + '&size=' + width + 'x' + height
}

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
