import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { pathOr, pluck } from 'ramda'

import { getIcon, toTitleCase } from 'zwUtility'

import { FilterBar } from 'Components$'
import { ListItem } from 'StyleFn'

import constants from 'constants.css'
import styles from './ListView.css'

const styleEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const getLanguageName = (targetLanguage = 'en') => {
  return languageString => {
    const translations = {
      en: {
        'en': 'English',
        'es': 'Spanish',
        'it': 'Italian',
        'de': 'German'
      }
    }

    return pathOr(languageString, [targetLanguage, languageString])(translations)
  }
}

const _render = ({
  filterBarDOM,
  practitioners
}) => div([
  filterBarDOM,
  div({
    className: styles.container
  }, [
    div({
      className: styles.tableHeader
    }, [
      div({
        style: {
          width: '200px'
        }
      }, 'Name'),
      div({
        style: {
          width: '95px'
        }
      }, 'ZWMID'),
      div({
        style: {
          width: '95px'
        }
      }, 'NPI'),
      div({
        style: {
          width: '120px'
        }
      }, 'Languages'),
      div({
        style: {
          width: '160px'
        }
      }, 'Residency'),
      div({
        style: {
          width: '95px'
        }
      }, 'DEA License'),
      div({
        style: {
          width: '195px'
        }
      }, 'Specialty')
    ]),
    practitioners.map(practitioner => ListItem({
      className: 'practitioner',
      image: pathOr(null, ['image', 'url'])(practitioner),
      icon: getIcon(practitioner, 'practitioner'),
      entity: practitioner,
      style: {
        cursor: 'pointer'
      },
      attributes: {
        'data-id': practitioner.id
      },
      children: [
        div({
          style: {
            width: '85px'
          }
        }, practitioner.zwmid),
        div({
          style: {
            width: '85px'
          }
        }, practitioner.npi),
        div({
          style: {
            width: '110px',
            ...styleEllipsis
          }
        },
        practitioner.languages
          ? [(pluck('id')(practitioner.languages)).map(getLanguageName('en')).join(', ')]
          : []
        ),
        ((residencies) => {
          residencies = residencies || []
          const residencyString = residencies.map(residency => toTitleCase(residency)).join(', ')

          return div({
            style: {
              width: '150px',
              ...styleEllipsis
            },
            title: residencyString
          },
            [residencyString]
          )
        })(practitioner.residencies),
        div({
          style: {
            width: '85px'
          }
        }, practitioner.dea_number),
        div({
          style: {
            width: '185px',
            ...styleEllipsis
          }
        },
        practitioner.specialties
          ? practitioner.specialties
              .map(specialty => toTitleCase(specialty) + ', ')
          : []
        )
      ]
    }))
  ])
])

const _navActions = (sources) => sources.DOM.select('.practitioner')
    .events('click')
    .map(ev => '/practitioner/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const route$ = _navActions(sources)

  const filterBar = FilterBar({
    ...sources,
    props$: Observable.just({
      title: 'FILTER',
      style: {
        margin: '0 auto',
        width: constants.maxWidth
      },
      children: [{
        id: 'all',
        name: 'All',
        isActive: true
      }
      // , {
      //   id: 'advancedFilters',
      //   name: 'Advanced Filters',
      //   isActive: false
      // }
    ]
    })
  })

  const viewState = {
    filterBarDOM: filterBar.DOM,
    practitioners: sources.practitioners$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
