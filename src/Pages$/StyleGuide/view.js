import { Observable } from 'rx'
import { div, h4 } from '@cycle/dom'

const { just, from } = Observable

import styles from './StyleGuide.css'

export default model$ => {

  const styles$ = model$.StyleFns
    .map(stylesFn => {
      return div({
        className: styles.styleContainer
      }, [
        h4({
          className: styles.styleTitle
        }, stylesFn.name),
        div({
          className: styles.styleChildren
        }, [
          stylesFn.children.map(child => {
            return div({
              className: styles.styleChild
            }, [
              div(child.fn),
              div(child.name)
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
