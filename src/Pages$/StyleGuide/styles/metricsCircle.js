import { MetricsCircle } from 'StyleFn'

import constants from 'constants.css'

const children = [{
  name: '',
  fn: MetricsCircle({
    size: '195px',
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
        backgroundColor: constants.color4
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
      text: '+/- 0 this week'
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
        backgroundColor: constants.color2
      },
      text: '-4 this week'
    }
  })
}]

const circle = {
  name: 'MetricsCircle',
  children: children,
  style: {
    marginRight: '80px'
  }
}

export default circle
