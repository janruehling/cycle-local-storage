import { div, img } from '@cycle/dom'

import { Avatar, Icon, List, QuickFact, KeyValue } from 'StyleFn'

import constants from 'constants.css'
import styles from './DetailsCard.css'

const _render = (options) => div({
  className: styles.container
}, [
  options.topCallout && div({
    style: {
      display: 'flex'
    }
  }, [
    options.type && div({
      style: {
        alignItems: 'center',
        background: constants.color1_4,
        color: constants.color1,
        display: 'flex',
        fontSize: '12px',
        lineHeight: '25px',
        padding: '0 10px'
      }
    }, [
      options.type.icon && Icon({
        icon: options.type.icon,
        style: {
          fontSize: '13px',
          marginRight: '5px'
        }
      }),
      options.type.name && div(options.type.name)
    ]),
    div({
      style: {
        background: constants.color4,
        flex: 1
      }
    }, [
      KeyValue({
        ...options.topCallout,
        reverse: true,
        style: {
          color: '#fff',
          fontSize: '12px',
          lineHeight: '25px',
          padding: '0 10px',
          margin: '0'
        }
      }),
      options.topCallout.tick ? Icon({
        icon: 'Tick',
        style: {
          fontSize: '11px',
          marginLeft: '15px',
          color: '#fff'
        }
      }) : null
    ])
  ]),
  div({
    className: styles.cardBody,
    style: {
      paddingTop: options.topCallout ? 0 : '20px'
    }
  }, [
    options.title && div({
      className: styles.title
    }, options.title),
    options.subTitle && div({
      className: styles.subTitle
    }, options.subTitle),
    div({
      className: styles.cardMeta
    }, [
      options.image && Avatar({
        image: options.image.src,
        icon: options.image.icon,
        className: styles.avatar,
        size: 80
      }),
      (options.meta && options.meta.length) && div([
        options.meta.map(meta => KeyValue({
          ...meta,
          reverse: true
        }))
      ])
    ]),
    options.imageFull && options.imageFull.src
      ? div({
        className: styles.imageFull
      }, [
        img({
          src: options.imageFull.src
        })
      ])
      : null,
    options.lists
      ? div({
        className: styles.listsContainer,
        style: {
          marginTop: '15px'
        }
      }, [
        options.lists.map(list =>
          (list.items && list.items.length) ? List({
            title: list.title,
            style: {
              marginBottom: '5px'
            },
            styleHeading: {
              marginBottom: '2px',
              marginTop: '5px'
            },
            items: list.items
          }) : null)
      ])
      : null,
    options.quickFacts && options.quickFacts.length &&
      div({
        className: styles.quickFactsContainer
      }, [
        options.quickFacts.map(fact => QuickFact({
          key: fact.key,
          value: fact.value
        }))
      ]),
    options.bottomCallout && options.bottomCallout.length &&
      options.bottomCallout.map(callout => KeyValue({
        ...callout,
        style: {
          color: '#fff',
          background: constants.color4,
          padding: '4px 8px',
          borderRadius: '4px',
          display: 'inline-block'
        }
      }))
  ])
])

export const DetailsCard = (options) => {
  options = options || {}

  return _render(options)
}
