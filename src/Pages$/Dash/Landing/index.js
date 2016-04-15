import { div, span, a, img } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { pathOr } from 'ramda'

import constants from 'constants.css'
import helpers from 'helpers.css'
import styles from './Landing.css'

import USAMap from 'assets/img/USA_Map.png'

import { MetricsCallout, MetricsCircle, Heading, List } from 'StyleFn'

const _getChangeObject = (changeString) => {
  const number = Number(changeString)

  if (Number.isNaN(number)) return null

  if (number > 0) {
    return {
      style: {
        backgroundColor: constants.secondary2
      },
      text: '+' + changeString + ' this week'
    }
  } else if (number < null) {
    return {
      style: {
        backgroundColor: constants.secondary3
      },
      text: '-' + changeString + ' this week'
    }
  } else {
    return {
      text: '+/- 0 this week'
    }
  }
}

const _render = ({
  stats,
  organization,
  config
}) => {
  return div({
    className: styles.container
  }, [
    div({
      className: styles.sidebar
    }, [
      MetricsCallout({
        title: 'Data Quality',
        metric: '97%',
        change: '2%',
        descriptionDOM: div([
          span({style: {color: 'green'}}, '116.227 '),
          span({style: {color: '#fff'}}, 'records verified and updated in the last 30 days')
        ]),
        average: 'Industry Average: 52%'
      }),
      List({
        title: 'Activity Feed',
        items: [{
          text: 'No recent activity'
        }]
      })
    ]),
    div({
      className: styles.main
    }, [
      div({
        className: styles.mainTitle
      }, 'Your company at a glance'),
      div({
        className: styles.mainMetricsCircles
      }, [
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Contact'
          },
          metric: {
            text: pathOr('0', ['practitioners', 'total'])(stats)
          },
          title: {
            text: (Number(pathOr('0', ['practitioners', 'total'])(stats)) === 1)
              ? 'Practitioner'
              : 'Practitioners'
          },
          link: {
            text: 'view all',
            className: 'link',
            href: '/#/practitioners/'
          },
          change: _getChangeObject(pathOr(null, ['practitioners', 'last_week'])(stats))
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Hospital'
          },
          metric: {
            text: pathOr('0', ['locations', 'total'])(stats)
          },
          title: {
            text: (Number(pathOr('0', ['locations', 'total'])(stats)) === 1)
              ? 'Location'
              : 'Locations'
          },
          link: {
            text: 'view all',
            href: '/#/locations/'
          },
          change: _getChangeObject(pathOr(null, ['locations', 'last_week'])(stats))
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Shield'
          },
          metric: {
            text: pathOr('0', ['groups', 'total'])(stats)
          },
          title: {
            text: (Number(pathOr('0', ['groups', 'total'])(stats)) === 1)
              ? 'Organization'
              : 'Organizations'
          },
          link: {
            text: 'view all',
            href: '/#/groups/'
          },
          change: _getChangeObject(pathOr(null, ['groups', 'last_week'])(stats))
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Sheet'
          },
          metric: {
            text: pathOr('0', ['plans', 'total'])(stats)
          },
          title: {
            text: (Number(pathOr('0', ['plans', 'total'])(stats)) === 1)
              ? 'Plan'
              : 'Plans'
          },
          link: {
            text: 'view all',
            href: '/#/plans/'
          },
          change: _getChangeObject(pathOr(null, ['plans', 'last_week'])(stats))
        })
      ]),
      div({
        className: helpers.layout
      }, [
        div([
          Heading({
            text: 'Geographic spread',
            style: {
              display: 'flex',
              justifyContent: 'center',
              margin: '30px 0 20px'
            }
          }),
          img({
            src: USAMap
          })
        ]),
        div({
          className: styles.practitionerProfileContainer
        }, [
          div({
            className: helpers.layout
          }, [
            Heading({
              text: 'Practitioner Profile',
              icon: 'Contact',
              style: {
                margin: '0 0 15px'
              }
            })
          ]),
          pathOr(null, ['average_practitioner', 'gender', 'male'])(stats) && div({
            className: helpers.layout,
            style: {
              margin: '5px 0'
            }
          }, [
            div({
              style: {
                width: '65px'
              }
            }, 'Male: '),
            div({
              style: {
                flex: 1,
                position: 'relative'
              }
            }, [
              div({
                style: {
                  backgroundColor: constants.primary1,
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'right',
                  padding: '2px 5px',
                  width: Math.round(pathOr(0, ['average_practitioner', 'gender', 'male'])(stats)) + '%'
                }
              }, [Math.round(pathOr(0, ['average_practitioner', 'gender', 'male'])(stats)) + '%'])
            ])
          ]),
          pathOr(null, ['average_practitioner', 'gender', 'female'])(stats) && div({
            className: helpers.layout,
            style: {
              margin: '5px 0'
            }
          }, [
            div({
              style: {
                width: '65px'
              }
            }, 'Female: '),
            div({
              style: {
                flex: 1,
                position: 'relative'
              }
            }, [
              div({
                style: {
                  backgroundColor: constants.additional10,
                  color: constants.primary1,
                  fontWeight: 'bold',
                  textAlign: 'right',
                  padding: '2px 5px',
                  width: Math.round(pathOr(0, ['average_practitioner', 'gender', 'female'])(stats)) + '%'
                }
              }, [Math.round(pathOr(0, ['average_practitioner', 'gender', 'female'])(stats)) + '%'])
            ])
          ]),
          pathOr(null, ['average_practitioner', 'accepting_medicaid'])(stats) && div([
            div({
              style: {
                color: constants.additional11,
                fontSize: '14px',
                margin: '15px 0 5px'
              }
            }, 'Accepting Medicaid:'),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.primary1,
                color: '#fff',
                display: 'flex',
                padding: '2px 5px',
                margin: '5px 0',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_medicaid', 'average'])(stats)) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '10px'
                }
              }, organization.name),
              div({
                style: {
                  flex: 1
                }
              }),
              div({
                style: {
                  fontWeight: 'bold'
                }
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_medicaid', 'average'])(stats)) + '%')
            ]),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.additional10,
                color: constants.primary1,
                display: 'flex',
                padding: '2px 5px',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_medicaid', 'us'])(stats)) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '10px'
                }
              }, 'National average'),
              div({
                style: {
                  flex: 1
                }
              }),
              div({
                style: {
                  fontWeight: 'bold'
                }
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_medicaid', 'us'])(stats)) + '%')
            ])
          ]),
          pathOr(null, ['average_practitioner', 'accepting_medicare'])(stats) && div([
            div({
              style: {
                color: constants.additional11,
                fontSize: '14px',
                margin: '15px 0 5px'
              }
            }, 'Accepting Medicare:'),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.primary1,
                color: '#fff',
                display: 'flex',
                padding: '2px 5px',
                margin: '5px 0',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_medicare', 'average'])(stats)) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '10px'
                }
              }, organization.name),
              div({
                style: {
                  flex: 1
                }
              }),
              div({
                style: {
                  fontWeight: 'bold'
                }
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_medicare', 'average'])(stats)) + '%')
            ]),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.additional10,
                color: constants.primary1,
                display: 'flex',
                padding: '2px 5px',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_medicare', 'us'])(stats)) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '10px'
                }
              }, 'National average'),
              div({
                style: {
                  flex: 1
                }
              }),
              div({
                style: {
                  fontWeight: 'bold'
                }
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_medicare', 'us'])(stats)) + '%')
            ])
          ]),
          pathOr(null, ['average_practitioner', 'accepting_new_patients'])(stats) && div([
            div({
              style: {
                color: constants.additional11,
                fontSize: '14px',
                margin: '15px 0 5px'
              }
            }, 'Accepting New Patients:'),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.primary1,
                color: '#fff',
                display: 'flex',
                padding: '2px 5px',
                margin: '5px 0',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_new_patients', 'average'])(stats)) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '10px'
                }
              }, organization.name),
              div({
                style: {
                  flex: 1
                }
              }),
              div({
                style: {
                  fontWeight: 'bold'
                }
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_new_patients', 'average'])(stats)) + '%')
            ]),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.additional10,
                color: constants.primary1,
                display: 'flex',
                padding: '2px 5px',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_new_patients', 'us'])(stats)) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '10px'
                }
              }, 'National average'),
              div({
                style: {
                  flex: 1
                }
              }),
              div({
                style: {
                  fontWeight: 'bold'
                }
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_new_patients', 'us'])(stats)) + '%')
            ])
          ])
        ])
      ])
    ]),
    div({
      className: styles.sidebar
    }, [
      List({
        title: 'Recent Searches',
        items: [{
          text: 'No Searches yet'
        }]
      }),
      stats.top_plans && div([
        Heading({
          text: 'Top Plans'
        }),
        (pathOr([], ['top_plans'])(stats))
          .map(plan => div({

          }, [
            div({
              className: styles.topPlanContainer
            }, [
              a({
                className: styles.topPlanTitle,
                href: '/#/plan/' + plan.id
              }, plan.name),
              (plan.practitioners || plan.groups) && div([
                div({
                  className: styles.topPlanAccepted
                }, 'Accepted by:'),
                plan.practitioners && div(plan.practitioners + ' Practitioners'),
                plan.groups && div(plan.groups + ' Organizations')
              ])
            ])
          ]))
      ])
    ])
  ])
}

export default sources => {
  const viewState = {
    organization: sources.organization$,
    stats: sources.stats$,
    config: sources.config$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM
  }
}
