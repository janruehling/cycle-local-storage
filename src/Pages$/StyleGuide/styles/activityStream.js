import { div } from '@cycle/dom'
import { ActivityStream } from 'StyleFn'

const children = [{
  name: '',
  fn: div({}, [
    ActivityStream({
      title: 'Text only',
      items: [{
        text: 'first item'
      },
        {
          text: 'second item'
        }]
    }),
    ActivityStream({
      title: 'With Icon in Title',
      icon: 'Shield',
      items: [{
        date: '2016-05-12T14:41:52.000Z',
        avatar: {
          image: null,
          icon: 'Contact'
        },
        text: 'A linked text',
        link: '#'
      }]
    })
  ])
}]

const out = {
  name: 'ActivityStream',
  children: children
}

export default out
