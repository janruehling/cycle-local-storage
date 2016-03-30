import { div, input, label } from '@cycle/dom'

import './Tabs.css'

const Tabs = (props, children) => children && div({
    className: 'tab-wrap'
  },
    children.reduce((a, b) => a.concat(b))
      .concat([div({className: 'slide'}, '')])
)

const Tab = ({id, link}, children) => [
  input({
    type: 'radio',
    name: 'tabs',
    id: id
  }
  ),
  div('.tab-label-content',
    {
      attributes: {
        'data-link': link
      }
    },
    [
      label({
        for: id
      }),
      children
    ]
  ),
]

export { Tabs, Tab }
