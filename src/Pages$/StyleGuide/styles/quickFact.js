import { div } from '@cycle/dom'
import { QuickFact } from 'StyleFn'

const children = [{
  name: '',
  fn: div([
    QuickFact({
      key: 'True Fact',
      value: true
    }),
    QuickFact({
      key: 'False Fact',
      value: false
    })
  ])
}]

const facts = {
  name: 'QuickFact',
  children: children,
  style: {
    marginRight: '40px'
  }
}

export default facts
