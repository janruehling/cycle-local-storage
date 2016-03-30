import { Observable } from 'rx'
const { just } = Observable
import { h4 } from '@cycle/dom'

export const ComingSoon = name => () => ({
  DOM: just(h4('Coming Soon: ' + name))
})
