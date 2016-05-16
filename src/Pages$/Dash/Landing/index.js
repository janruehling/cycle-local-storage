import { Observable } from 'rx'
import { div, a, span, img } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import R, { pathOr } from 'ramda'

import constants from 'constants.css'
import helpers from 'helpers.css'
import styles from './Landing.css'

import USAMap from 'assets/img/USA_Map.png'

import { ActivityStream, MetricsCalloutV2, MetricsCircle, Heading, List,
  HighlightBox } from 'StyleFn'
import { getActivity } from 'zwUtility'

const _getChangeObject = (changeString) => {
  const number = Number(changeString)

  if (typeof number === 'number' && isNaN(number)) return null

  if (number > 0) {
    return {
      style: {
        backgroundColor: constants.color4
      },
      text: '+' + changeString + ' this week'
    }
  } else if (number < null) {
    return {
      style: {
        backgroundColor: constants.color2
      },
      text: changeString + ' this week'
    }
  } else {
    return {
      text: '+/- 0 this week'
    }
  }
}

const _getPercentage = (total, num) => {
  const percentage = num / total * 100
  return Math.round(percentage)
}

const _render = ({
  stats,
  organization,
  activities,
  maxStats
}) => {
  return div({
    className: styles.container
  }, [
    div({
      className: styles.sidebar
    }, [
      stats && stats.verification_info && MetricsCalloutV2({
        title: 'Verification',
        metric: _getPercentage(stats.verification_info.total, stats.verification_info.verified) + '%',
        metricDescription: 'Zipwire Verified',
        change: null,
        descriptionDOM: div([
          span({style: {color: '#fff'}}, 'There are '),
          span({style: {color: constants.color4}}, stats.verification_info.total + ' '),
          span({style: {color: '#fff'}}, 'records in your system')
        ]),
        average: null
      }),
      ActivityStream({
        title: 'Activity Feed',
        items: R.compose(R.map(getActivity), R.take(5))(activities)
      })
    ]),
    div({
      className: styles.main
    }, [
      div({
        className: styles.mainTitle
      }, 'Your Company at a Glance'),
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
            href: '/#/practitioners'
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
            href: '/#/locations'
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
            href: '/#/groups'
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
            href: '/#/plans'
          },
          change: _getChangeObject(pathOr(null, ['plans', 'last_week'])(stats))
        })
      ]),
      div({
        className: helpers.layout
      }, [
        div([
          Heading({
            text: 'Geographic Spread',
            style: {
              display: 'flex',
              justifyContent: 'center',
              margin: '15px 0 25px'
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
          div({
            className: helpers.layout,
            style: {
              margin: '5px 0'
            }
          }, [
            div({
              style: {
                color: constants.color1,
                textAlign: 'right',
                marginRight: '5px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
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
                  backgroundColor: constants.color1,
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '2px 5px',
                  textAlign: 'right',
                  width: Math.round(pathOr(0, ['average_practitioner', 'gender', 'male'])(stats) / maxStats * 100) + '%'
                }
              }, [Math.round(pathOr(0, ['average_practitioner', 'gender', 'male'])(stats)) + '%'])
            ])
          ]),
          div({
            className: helpers.layout,
            style: {
              margin: '5px 0'
            }
          }, [
            div({
              style: {
                color: constants.color1,
                textAlign: 'right',
                marginRight: '5px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
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
                  color: constants.color1,
                  fontWeight: 'bold',
                  textAlign: 'right',
                  padding: '2px 5px',
                  width: Math.round(pathOr(0, ['average_practitioner', 'gender', 'female'])(stats) / maxStats * 100) + '%'
                }
              }, [Math.round(pathOr(0, ['average_practitioner', 'gender', 'female'])(stats)) + '%'])
            ])
          ]),
          pathOr(null, ['average_practitioner', 'accepting_medicaid'])(stats) && div([
            div({
              style: {
                color: constants.color1,
                fontSize: '14px',
                margin: '15px 0 5px'
              }
            }, 'Accepting Medicaid:'),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.color1,
                color: '#fff',
                display: 'flex',
                padding: '2px 5px',
                margin: '5px 0',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_medicaid', 'us'])(stats) / maxStats * 100) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '12px'
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
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_medicaid', 'us'])(stats)) + '%')
            ]),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.additional10,
                color: constants.color1,
                display: 'flex',
                padding: '2px 5px',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_medicaid', 'average'])(stats) / maxStats * 100) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '12px'
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
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_medicaid', 'average'])(stats)) + '%')
            ])
          ]),
          pathOr(null, ['average_practitioner', 'accepting_medicare'])(stats) && div([
            div({
              style: {
                color: constants.color1,
                fontSize: '14px',
                margin: '15px 0 5px'
              }
            }, 'Accepting Medicare:'),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.color1,
                color: '#fff',
                display: 'flex',
                padding: '2px 5px',
                margin: '5px 0',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_medicare', 'us'])(stats) / maxStats * 100) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '12px'
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
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_medicare', 'us'])(stats)) + '%')
            ]),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.additional10,
                color: constants.color1,
                display: 'flex',
                padding: '2px 5px',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_medicare', 'average'])(stats) / maxStats * 100) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '12px'
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
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_medicare', 'average'])(stats)) + '%')
            ])
          ]),
          pathOr(null, ['average_practitioner', 'accepting_new_patients'])(stats) && div([
            div({
              style: {
                color: constants.color1,
                fontSize: '14px',
                margin: '15px 0 5px'
              }
            }, 'Accepting New Patients:'),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.color1,
                color: '#fff',
                display: 'flex',
                padding: '2px 5px',
                margin: '5px 0',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_new_patients', 'us'])(stats) / maxStats * 100) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '12px'
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
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_new_patients', 'us'])(stats)) + '%')
            ]),
            div({
              style: {
                alignItems: 'center',
                backgroundColor: constants.additional10,
                color: constants.color1,
                display: 'flex',
                padding: '2px 5px',
                width: Math.round(pathOr(0, ['average_practitioner', 'accepting_new_patients', 'average'])(stats) / maxStats * 100) + '%'
              }
            }, [
              div({
                style: {
                  fontSize: '12px'
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
              }, Math.round(pathOr(0, ['average_practitioner', 'accepting_new_patients', 'average'])(stats)) + '%')
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
        styleHeading: {
          marginTop: '0'
        },
        items: [{
          text: 'No Searches yet'
        }]
      }),
      stats.top_plans && div([
        Heading({
          text: 'Top Plans'
        }),
        (pathOr([], ['top_plans'])(stats))
          .map(plan => HighlightBox({
            id: plan.id,
            title: plan.name,
            count: ['practitioners', 'groups'].map(entity => {
              const isPractitioner = entity === 'practitioners'
              const name = isPractitioner ? 'Practitioner' : 'Organizations'
              const count = plan[entity]

              return a({
                href: isPractitioner ? '/#/practitioners?filter=plan_' + plan.id : '/#/groups?filter=plan_' + plan.id
              }, count + ' ' + name)
            })
          }))
      ])
    ])
  ])
}

export default sources => {
  const planTitleClicks$ = sources.DOM.select('.HighlightBox_title_hook')
    .events('click')
    .map(ev => '/plan/' + ev.ownerTarget.dataset.id + '/')

  const activityClicks$ = sources.DOM.select('.ActivityStream_item_hook')
    .events('click')
    .map(ev => '/' + ev.ownerTarget.dataset.type + '/' + ev.ownerTarget.dataset.id + '/')

  const maxStats$ = sources.stats$
    .map(stats => {
      const max = R.flatten(R.valuesIn(stats.average_practitioner).map(o => R.valuesIn(o))).reduce(R.max, [])
      return max
    })

  const route$ = Observable.merge(
    planTitleClicks$,
    activityClicks$
  )

  const viewState = {
    organization$: sources.organization$,
    stats$: sources.stats$,
    activities$: sources.activities$,
    maxStats$: maxStats$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}

export { _getChangeObject }
