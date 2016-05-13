import R from 'ramda'
import moment from 'moment'
import { div, span, a } from '@cycle/dom'
import classNames from 'classnames'

import { Avatar, Heading } from 'StyleFn'

import styles from './ActivityStream.css'

const mapIndexed = R.addIndex(R.map)

export const ActivityStream = (options = {}) => {
  return (options.items && options.items.length) ? div({
    className: styles.container
  }, [
    options.title && Heading({
      icon: options.icon,
      text: options.title
    }),
    mapIndexed((item, idx, list) => div({
      className: classNames({
        ['ActivityStream_item_hook']: true,
        [styles.item]: true
      }),
      attributes: {
        'data-id': item.id,
        'data-type': item.linkType
      }
    }, [
      div({
        className: styles.itemBorder
      }, [
        div({
          className: styles.itemBorderDot
        }),
        div({
          className: classNames({
            [styles.itemBorderLine]: idx < (list.length - 1)
          })
        })
      ]),
      div({
        style: {
          flex: 1
        }
      }, [
        item.date && moment(item.date).isValid() &&
          div({
            className: styles.itemDate
          }, moment(item.date).format('ll')),
        div({
          className: styles.itemDescription
        }, [
          div({
            className: styles.itemIcon
          }, [
            item.avatar && Avatar({
              image: item.avatar.image,
              icon: item.avatar.icon,
              size: 15,
              style: {
                background: '#fff'
              }
            })
          ]),
          item.text && (item.link
            ? a({
              href: item.link,
              className: styles.itemLink
            }, item.text)
            : span({
              className: styles.itemText
            }, item.text)
          ),
          item.children && div({
            className: styles.itemText
          }, [item.children])
        ])
      ])
    ]))(options.items)
  ]) : null
}
