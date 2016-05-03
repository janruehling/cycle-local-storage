import { Observable } from 'rx'
import { div, h4 } from '@cycle/dom'

const { just } = Observable

import styles from './StyleGuide.css'

export default model$ => {
  const styles$ = model$.StyleFns
    .map(stylesFn => {
      return div({
        className: styles.styleContainer,
        style: stylesFn.style || null
      }, [
        h4({
          className: styles.styleTitle
        }, stylesFn.name),
        div({
          className: styles.styleChildren
        }, [
          stylesFn.children.map(child => {
            return div({
              className: styles.styleChild,
              style: child.style
            }, [
              div({
                className: styles.styleChildTitle
              }, child.name),
              div(child.fn)
            ])
          })
        ])
      ])
    })

  const DOM = just(div({
    className: styles.container
  }, [
    styles$
  ]))

  return {
    DOM: DOM
  }
}
