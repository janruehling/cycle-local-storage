import { div, input } from '@cycle/dom'
import classNames from 'classnames'

import { Icon } from 'StyleFn'
import styles from './zwTextSelect.css'

const _createInput = (attributes) => div({
  className: styles.inputContainer,
  style: {
    ...attributes.styleInput,
    flex: 1
  }
}, [
  input({
    ...attributes,
    className: classNames({
      [styles.input]: true,
      'closedInput': true,
      [attributes.className]: !!attributes.className
    })
  }),
  Icon({
    icon: 'Drop',
    className: styles.icon
  })
])

const _createInputWithResult = (attributes) => div([
  div({
    className: styles.inputContainer,
    style: {
      ...attributes.styleInput,
      flex: 1
    }
  }, [
    input({
      ...attributes,
      className: classNames({
        [styles.input]: true,
        openedInput: true,
        [attributes.className]: !!attributes.className
      })
    }),
    Icon({
      icon: 'Drop',
      className: styles.icon
    })
  ]),
  div({
    className: styles.results
  }, [
    (attributes.results && attributes.results.length) ? attributes.results
      .map(result => {
        return div({
          className: classNames({
            [styles.resultsItem]: true,
            result: true,
            [styles.isActive]: result.value === attributes.value
          }),
          attributes: {
            'data-key': result.key,
            'data-value': result.value
          },
          style: {
            ...attributes.styleInput
          }
        }, result.value)
      }) : div({
        className: styles.resultsItem
      }, 'No results')
  ])
])

export const zwTextSelect = (attributes = {}) => {
  return div({
    className: attributes.skin ? styles[attributes.skin] : styles.default,
    style: attributes.style
  }, [
    attributes.label && div({
      className: styles.label,
      style: {
        ...attributes.styleLabel
      }
    }, attributes.label),
    attributes.focus ? div({
      className: classNames({
        [styles.focus]: attributes.focus
      }),
      style: {
        flex: 1
      }
    }, [
      _createInputWithResult(attributes)
    ]) : div({
      style: {
        flex: 1
      }
    }, [
      _createInput(attributes)
    ])
  ])
}
