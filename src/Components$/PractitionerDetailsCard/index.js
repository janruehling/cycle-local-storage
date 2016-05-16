import { Observable } from 'rx'
import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import { pathOr } from 'ramda'

import { toTitleCase, getName, getIcon, getGender, getLanguage } from 'zwUtility'
import { DetailsCard } from 'StyleFn'

const _render = ({
  practitioner
}) => practitioner ? DetailsCard({
  type: {
    icon: 'Contact',
    name: 'Practitioner'
  },
  topCallout: (practitioner.last_verified && moment(practitioner.last_verified).isValid())
    ? {
      key: 'Last Verified',
      value: moment(practitioner.last_verified).format('MMM D, Y'),
      tick: true
    } : {
      key: 'Last Verified',
      value: 'Not verified'
    },
  title: toTitleCase(getName(practitioner)),
  subTitle: practitioner.degrees ? practitioner.degrees.join(', ') : null,
  image: {
    src: pathOr(null, ['image', 'url'])(practitioner),
    icon: getIcon(practitioner, 'practitioner')
  },
  meta: [
    {
      key: null,
      value: getGender(practitioner) || '' +
      (practitioner.age
        ? ', ' + practitioner.age
        : '')
    },
    {
      key: 'ZWMID',
      value: practitioner.zwmid
    },
    {
      key: 'NPI',
      value: practitioner.npi
    }
  ],
  lists: [
    {
      title: 'Languages:',
      items: practitioner.languages ? practitioner.languages.map(getLanguage).map(str => ({text: str})) : null
    },
    {
      title: 'Medical School:',
      items: practitioner.medical_school ? [practitioner.medical_school].map(school => ({
        text: toTitleCase(school.name) + (school.graduated ? ', ' + school.graduated : '')
      })) : null
    },
    {
      title: 'Residencies:',
      items: practitioner.residencies ? practitioner.residencies.map(residency => ({
        text: toTitleCase(residency)
      })) : null
    },
    {
      title: 'State License:',
      items: practitioner.state_license ? [{
        text: practitioner.state_license
      }] : null
    },
    {
      title: 'DEA License:',
      items: practitioner.dea_license ? [{
        text: practitioner.dea_license
      }] : null
    },
    {
      title: 'Specialties:',
      items: practitioner.specialties ? practitioner.specialties.map(specialty => ({
        text: toTitleCase(specialty)
      })) : null
    }
  ],
  quickFacts: [
    {
      key: 'Accepts New Patients',
      value: practitioner.accepts_new_patients
    },
    {
      key: 'Accepts Medicaid',
      value: practitioner.accepts_medicaid
    },
    {
      key: 'Accepts Medicare',
      value: practitioner.accepts_medicare
    }
  ],
  bottomCallout: [{
    key: 'Medicare Sanction',
    value: 'XXX-111'
  }]
}) : div()

export const PractitionerDetailsCard = sources => {
  const viewState = {
    practitioner$: sources.practitioner$ || Observable.just({})
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM
  }
}
