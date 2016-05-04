import { div } from '@cycle/dom'
import { HighlightBox } from 'StyleFn'

const children = [{
  name: '',
  fn: HighlightBox({
    title: 'Bronze Premier HMO',
    url: '#',
    id: '123456',
    count: ['18 Practitioners', '2 Organizations']
  })
}]

const out = {
  name: 'Element Highlight Box',
  children: children
}

export default out
