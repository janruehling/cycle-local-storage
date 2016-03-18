import { map, pathOr } from 'ramda'
import { div, span, img, strong } from '@cycle/dom'

import styles from './LocationsCard.css'
import helpers from 'helpers.css'

export default function view (model) {
  const vtree$ = model.location$
    .map(location => {
      const googleMap = 'http://maps.googleapis.com/maps/api/staticmap?center=' + pathOr(null, ['address', 'geo', 'latitude'])(location) + ',' + pathOr(null, ['address', 'geo', 'longitude'])(location) + '&zoom=15&size=272x272'
      return div([
        div([
          span({
            className: styles.title
          }, location.name)
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
            }, location.zwmid)
          ])
        ]),
        div([
          div({
            className: styles.imageContainer
          }, [
            img({
              className: styles.image,
              src: googleMap
            }),
            div({
              className: styles.lastVerified
            }, [
              span([
                'Last Verified: ',
                strong(location.last_verified)
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
                }, 'Address: '),
                div({
                  className: styles.columnItemContent
                }, [
                  div([
                    pathOr(null, ['address', 'street'])(location),
                    span(',')
                  ]),
                  div([
                    pathOr(null, ['address', 'city'])(location),
                    span(' '),
                    pathOr(null, ['address', 'state'])(location),
                    span(',')
                  ]),
                  div(pathOr(null, ['address', 'country'])(location))
                ])
              ])
            ]),
            div({
              className: styles.metaColumnRight
            }, [
              div([
                span({
                  className: styles.columnItemHeading
                }, 'Geo Coordinates: '),
                div({
                  className: styles.columnItemContent
                }, [
                  div(pathOr(null, ['address', 'geo', 'latitude'])(location)),
                  div(pathOr(null, ['address', 'geo', 'longitude'])(location))
                ])
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
