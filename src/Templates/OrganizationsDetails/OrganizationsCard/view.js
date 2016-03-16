import { map, pathOr } from 'ramda'
import { div, span, img, strong } from '@cycle/dom'

import styles from './PractitionersCard.css'
import helpers from 'helpers.css'

export default function view (model) {
  const vtree$ = model.organization$
    .map(organization => {
      return div([
        div([
          span({
            className: styles.title
          }, organization.name)
        ]),
        div({
          className: styles.ids
        }, [
          div({
            className: helpers.pushRight10
          }, [
            span('ZWMID: '),
            span({
              className: helpers.bold
            }, organization.zwmid)
          ]),
          div([
            span('NPI: '),
            span({
              className: helpers.bold
            }, organization.npi)
          ])
        ]),
        div([
          div({
            className: styles.imageContainer
          }, [
            img({
              className: styles.image,
              src: pathOr(null, ['image', 'src'])(organization)
            }),
            div({
              className: styles.lastVerified
            }, [
              span([
                'Last Verified: ',
                strong(organization.last_verified)
              ])
            ])
          ]),
          div({
            className: styles.metaColumns
          }, [
            div({
              className: styles.metaColumnLeft
            }, [
              div([
                span({
                  className: styles.columnItemHeading
                }, 'Type: '),
                div({
                  className: styles.columnItemContent
                }, organization.type)
              ]),
              div([
                span({
                  className: styles.columnItemHeading
                }, 'Belongs To: '),
                map(relation => {
                  return div({
                    className: styles.columnItemContent
                  }, [
                    span('ZWMID: ' + relation.zwmid)
                  ])
                })(pathOr([], ['belongs_to'])(organization))
              ])
            ]),
            div({
              className: styles.metaColumnRight
            }, [
              div([
                span({
                  className: styles.columnItemHeading
                }, 'Legal Structure: '),
                div({
                  className: styles.columnItemContent
                }, organization.legal_structure)
              ]),
              div([
                span({
                  className: styles.columnItemHeading
                }, 'IRS EIN: '),
                div({
                  className: styles.columnItemContent
                }, organization.irs_ein)
              ])
            ])
          ])
        ])
      ])
    })

  return {
    DOM: vtree$
  }
}
