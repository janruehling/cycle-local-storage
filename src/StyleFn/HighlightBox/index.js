import { div, a } from '@cycle/dom'
import styles from './HighlightBox.css'

export const HighlightBox = ({
  id,
  url,
  target,
  title,
  count,
  entity
}) => div({

}, [
  div({
    className: styles.topPlanContainer
  }, [
    a({
      className: styles.topPlanTitle,
      href: url,
      target: target || null
    }, title),
    div([
      div({
        className: styles.topPlanAccepted
      }, 'Accepted by:'),
      count && count.map(c => div(c))
    ])
  ])
])
