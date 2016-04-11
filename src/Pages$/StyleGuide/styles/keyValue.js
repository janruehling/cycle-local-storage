import { div } from '@cycle/dom'
import { KeyValue } from 'StyleFn'

const children = [{
  name: '',
  fn: div([
    KeyValue({
      key: 'Regular',
      value: 'A regular value'
    }),
    KeyValue({
      key: 'Reverse',
      value: 'A reverse value',
      reverse: true
    })
  ])
}]

const out = {
  name: 'KeyValue',
  children: children
}

export default out
