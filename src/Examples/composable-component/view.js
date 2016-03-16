import { div, button, hr } from '@cycle/dom'
import styles from './composable-component.css'

export default function view (state$) {
  return state$.map(dynamicComponents => div({
    className: styles.container
  }, [
    button({
      className: 'addDynamicComponent'
    }, 'Add dynamic component'),
    dynamicComponents.length > 0 ? hr() : null,
    dynamicComponents.map((dynamicComponent, index) => div([
      dynamicComponent,
      button({
        value: index,
        className: 'removeDynamicComponent'
      }, 'Remove dynamic component'),
      (index + 1 !== dynamicComponents.length) ? hr() : null
    ]))
  ])
  )
}
