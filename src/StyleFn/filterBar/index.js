import { div, select, option } from '@cycle/dom'
import classNames from 'classnames'
import styles from './filterBar.css'

export const filterBar = ({props}) => {
  console.log(props)
  return div({
    className: styles.container,
    style: props.style
  }, [
    div({
      className: styles.title
    }, props.title),
    props.children && props.children.map(item => {
      if (item.type && item.type === 'select') {
        return select({
          id: item.id
        }, [
          item.options.map(o => option({
            attributes: {
              value: o.value
            }
          }, o.name))
        ])
      }

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
