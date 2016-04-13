import { a, div } from '@cycle/dom'

import classNames from 'classnames'

import styles from './Tabs.css'

const Tabs = (props, children) => children && div({
  ...props,
  className: classNames({
    [props.className]: !!props.className,
    [styles.container]: true
  })
},
  children
    .reduce((a, b) => a.concat(b))
    .concat([div({className: 'slide'}, '')])
)

const Tab = ({id, isActive, link}, children) => [
  a({
    className: classNames({
      [styles.isActive]: isActive,
      [styles.tabs]: true
    }),
    href: link
  }, [
    children
  ])
]

export { Tabs, Tab }
