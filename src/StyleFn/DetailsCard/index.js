import moment from 'moment'
import { div, span } from '@cycle/dom'

import { toTitleCase } from 'util'

import { Avatar, Icon, List, QuickFact, KeyValue } from 'StyleFn'

import constants from 'constants.css'
import styles from './DetailsCard.css'

const _render = (options) => div({
  className: styles.container
}, [
  options.topCallout && div({
    className: styles.topCallout
  }, [
      KeyValue({
        ...options.topCallout,
        reverse: true,
        style: {
          color: '#fff',
          fontSize: '12px',
          lineHeight: '25px',
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
          gender: options.image.gender,
          className: styles.avatar
        }),
        (options.meta && options.meta.length) && div([
          options.meta.map(meta => KeyValue({
            ...meta,
            reverse: true
          }))
        ])
      ]),
      options.lists && options.lists.length &&
        div({
          className: styles.listsContainer
        }, [
          options.lists.map(list =>
            (list.items && list.items.length) && List({
              title: list.title,
              items: list.items
            }))
        ]),
      options.quickFacts && options.quickFacts.length &&
        div({
          className: styles.quickFactsContainer
        }, [
          options.quickFacts.map(fact => QuickFact({
            key: fact.key,
            value: fact.value
          })),
        ]),
      options.bottomCallout && options.bottomCallout.length &&
        options.bottomCallout.map(callout => KeyValue({
          ...callout,
          style: {
            color: '#fff',
            background: constants.secondary2,
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
