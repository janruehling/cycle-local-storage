import { MetricsCircle } from 'StyleFn'

import constants from 'constants.css'

const children = [{
  name: '',
  fn: MetricsCircle({
    size: '300px',
    icon: {
      text: 'Contact'
    },
    metric: {
      text: '12'
    },
    title: {
      text: 'Practitioners'
    },
    change: {
      style: {
        backgroundColor: constants.secondary2
      },
      text: '+3 this week'
    }
  })
}, {
  name: '',
  fn: MetricsCircle({
    icon: {
      text: 'Shield'
    },
    metric: {
      text: '3'
    },
    title: {
      text: 'Organizations'
    },
    change: {
      text: '0 change this week'
    }
  })
}, {
  name: '',
  fn: MetricsCircle({
    icon: {
      text: 'Sheet'
    },
    metric: {
      text: '22'
    },
    title: {
      text: 'Plans'
    },
    change: {
      style: {
        backgroundColor: constants.secondary3
      },
      text: '-4 this week'
    }
  })
}]

const circle = {
  name: 'MetricsCircle',
  children: children
}

export default circle
