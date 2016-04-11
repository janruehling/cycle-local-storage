import { div } from '@cycle/dom'
import { Heading } from 'StyleFn'

const children = [{
  name: '',
  fn: div([
    Heading({
      text: 'No Icon',
    }),
    Heading({
      text: 'With Icon',
      icon: 'Hospital'
    })
  ])
}]

const out = {
  name: 'Heading',
  children: children
}

export default out
