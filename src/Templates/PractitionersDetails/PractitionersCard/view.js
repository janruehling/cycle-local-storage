import { map, pathOr } from 'ramda'
import { div, span, img, a, br, strong } from '@cycle/dom'

import styles from './PractitionersCard.css'
import helpers from 'helpers.css'

export default function view (model) {
  const vtree$ = model.practitioner$
    .map(practitioner => {
      return div([
        div([
          span({
            className: styles.title
          }, practitioner.prefix + ' ' + practitioner.first_name + ' ' + practitioner.last_name)
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
            }, practitioner.zwmid)
          ]),
          div([
            span('NPI: '),
            span({
              className: helpers.bold
            }, practitioner.npi)
          ])
        ]),
        div([
          div({
            className: styles.imageContainer
          }, [
            img({
              className: styles.image,
              src: pathOr(null, ['image', 'src'])(practitioner)
            }),
            div({
              className: styles.lastVerified
            }, [
              span([
                'Last Verified: ',
                strong(practitioner.last_verified)
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
                }, 'Languages: '),
                map(language => {
                  return div({
                    className: styles.columnItemContent
                  }, language.name + ' ' + language.level)
                })(pathOr([], ['languages'])(practitioner))
              ]),
              div([
                span({
                  className: styles.columnItemHeading
                }, 'Medical School: '),
                map(school => {
                  return div({
                    className: styles.columnItemContent
                  }, school.name + ', ' + school.graduated)
                })(pathOr([], ['medical_school'])(practitioner))
              ]),
              div([
                span({
                  className: styles.columnItemHeading
                }, 'Residency: '),
                map(residency => {
                  return div({
                    className: styles.columnItemContent
                  }, residency.name)
                })(pathOr([], ['residencies'])(practitioner))
              ]),
              div([
                span({
                  className: styles.columnItemHeading
                }, 'State License: '),
                div({
                  className: styles.columnItemContent
                }, practitioner.state_license)
              ]),
              div([
                span({
                  className: styles.columnItemHeading
                }, 'DEA License: '),
                div({
                  className: styles.columnItemContent
                }, practitioner.dea_license)
              ])
            ]),
            div({
              className: styles.metaColumnRight
            }, [
              div([
                span({
                  className: styles.columnItemHeading
                }, 'Specialty: '),
                map(specialty => {
                  return div([
                    div({
                      className: styles.columnItemContent
                    }, [
                      a(specialty.name),
                      br(),
                      specialty.certified
                        ? span({
                          className: styles.certified
                        }, 'Board Certified')
                        : span({
                          className: styles.notCertified
                        }, 'Not Board Certified')
                    ])
                  ])
                })(pathOr([], ['specialties'])(practitioner))
              ]),
              div([
                div({
                  className: styles.columnItemHeading
                }, 'Accepts New Patients: '),
                practitioner.accepts_new_patients
                  ? div({
                    className: styles.columnItemContent
                  }, 'Yes')
                  : div({
                    className: styles.columnItemContent
                  }, 'No')
              ]),
              div([
                div({
                  className: styles.columnItemHeading
                }, 'Accepts Medicaid: '),
                practitioner.accepts_medicaid
                  ? div({
                    className: styles.columnItemContent
                  }, 'Yes')
                  : div({
                    className: styles.columnItemContent
                  }, 'No')
              ]),
              div([
                div({
                  className: styles.columnItemHeading
                }, 'Accepts Medicare: '),
                practitioner.accepts_medicare
                  ? div({
                    className: styles.columnItemContent
                  }, 'Yes')
                  : div({
                    className: styles.columnItemContent
                  }, 'No')
              ]),
              div({
                className: styles.sanction
              }, [
                div({
                  className: styles.sanctionHeading
                }, 'Medicare Sanction: '),
                div(practitioner.medicare_sanction)
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
