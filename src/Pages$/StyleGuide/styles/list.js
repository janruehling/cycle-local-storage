import { div } from '@cycle/dom'
import { List } from 'StyleFn'

const children = [{
  name: '',
  fn: div({}, [
    List({
      title: 'Text only',
      items: [{
        text: 'first item'
      },
      {
        text: 'second item'
      }]
    }),
    List({
      title: 'With Icon in Title',
      icon: 'Shield',
      items: [{
        text: 'A linked text',
        link: '#'
      }]
    })
  ])
}]

const out = {
  name: 'List',
  children: children
}

export default out
