import { div, a } from '@cycle/dom'
import classNames from 'classnames'
import styles from './HighlightBox.css'

export const HighlightBox = ({
  style,
  id,
  url,
  target,
  title,
  count,
  entity
}) => {
  const titleAttributes = {
    className: classNames({
      [styles.title]: true,
      HighlightBox_title_hook: !url
    }),
    attributes: {
      'data-id': id
    }
  }

  if (url) titleAttributes.href = url
  if (target) titleAttributes.target = target

  return div([
    div({
      className: styles.container,
      style: style || null
    }, [
      a(titleAttributes, title),
      div([
        count ? div({
          className: styles.accepted
        }, 'Accepted by:') : null,
        count && count.map(c => div({
          className: styles.link
        }, c))
      ])
    ])
  ])
}
