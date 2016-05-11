import { div } from '@cycle/dom'
import classNames from 'classnames'
import styles from './filterBar.css'

export const filterBar = ({props}) => {
  return div({
    className: styles.container
  }, [
    div({
      className: styles.title
    }, props.title),
    props.children && props.children.map(item => {
      return div({
        id: item.id,
        className: classNames({
          [styles.item]: true,
          [styles.isActive]: item.isActive
        })
      }, item.name)
    })
  ])
}
