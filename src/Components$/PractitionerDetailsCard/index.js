import { Observable } from 'rx'
import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'
import classNames from 'classnames'

import R from 'ramda'

import { toTitleCase, getName, getIcon, getGender, getLanguage } from 'zwUtility'
import { DetailsCard, Icon } from 'StyleFn'

import helpers from 'helpers.css'

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
  subTitle: practitioner.types ? practitioner.types.join(', ') : null,
  image: {
    src: R.pathOr(null, ['image', 'url'])(practitioner),
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
    },
    {
      key: 'DEA',
      value: practitioner.dea_number
    }
  ],
  lists: [
    {
      title: 'FAA Number:',
      items: practitioner.faa_number ? [{
        text: practitioner.faa_number
      }] : null
    },
    {
      title: 'PAC ID:',
      items: practitioner.pac_id ? [{
        text: practitioner.pac_id
      }] : null
    },
    {
      title: 'Contact:',
      items: (practitioner.email || practitioner.phone) ? [
        {
          children: practitioner.email
            ? div({
              className: classNames({
                [helpers.layout]: true,
                [helpers.center]: true
              })
            }, [
              Icon({
                icon: 'Envelope',
                style: {
                  fontSize: '12px',
                  marginRight: '10px'
                }
              }),
              div(practitioner.email)
            ])
            : null
        },
        {
          children: practitioner.phone
            ? div({
              className: classNames({
                [helpers.layout]: true,
                [helpers.center]: true
              })
            }, [
              Icon({
                icon: 'Phone',
                style: {
                  fontSize: '12px',
                  marginRight: '10px'
                }
              }),
              div(practitioner.phone)
            ])
            : null
        }
      ] : null
    },
    {
      title: 'Degrees:',
      items: practitioner.degrees ? [{
        text: practitioner.degrees.join(', ')
      }] : null
    },
    {
      title: 'Languages:',
      items: (practitioner.languages && practitioner.languages.length) ? [{
        text: practitioner.languages
          .map(getLanguage)
          .join(', ')
      }] : null
    },
    {
      title: 'Medical School:',
      items: practitioner.medical_school ? [practitioner.medical_school].map(school => ({
        text: toTitleCase(school.name) + (school.graduated ? ', ' + school.graduated : '')
      })) : null
    },
    {
      title: 'Internships:',
      items: (practitioner.internships && practitioner.internships.length) ? practitioner.internships.map(intern => ({
        text: toTitleCase(intern)
      })) : null
    },
    {
      title: 'Residencies:',
      items: practitioner.residencies ? practitioner.residencies.map(residency => ({
        text: toTitleCase(residency)
      })) : null
    },
    {
      title: 'State Licenses:',
      items: practitioner.state_licenses ? practitioner.state_licenses.map(license => ({
        text: license.state + ' ' + license.license + ' ( ' + toTitleCase(license.status) + ' )'
      })) : null
    },
    {
      title: 'Awards:',
      items: practitioner.awards ? [{
        text: practitioner.awards
          .map(toTitleCase)
          .join(', ')
      }] : null
    },
    {
      title: 'Specialties:',
      items: practitioner.specialties ? [{
        text: practitioner.specialties
          .map(toTitleCase)
          .join(', ')
      }] : null
    },
    {
      title: 'Fellowships:',
      items: practitioner.fellowships ? practitioner.fellowships.map(fellowship => ({
        text: toTitleCase(fellowship)
      })) : null
    },
    {
      title: 'Board Certifications:',
      items: practitioner.board_certifications ? [{
        text: practitioner.board_certifications.join(', ')
      }] : null
    },
    {
      title: 'Professional Associations:',
      items: practitioner.professional_associations ? [{
        text: practitioner.professional_associations
          .map(toTitleCase)
          .join(', ')
      }] : null
    },
    {
      title: 'Clinic Interests:',
      items: practitioner.clinic_interests ? [{
        text: practitioner.clinic_interests
          .map(toTitleCase)
          .join(', ')
      }] : null
    },
    {
      title: 'Personal Interests:',
      items: practitioner.personal_interests ? [{
        text: practitioner.personal_interests
          .map(toTitleCase)
          .join(', ')
      }] : null
    }
  ],
  workingHours: practitioner.hours ? {
    title: 'Working Hours',
    times: practitioner.hours
  } : null,
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
    },
    {
      key: 'Medicaid Certified',
      value: practitioner.medicaid_certified
    }
  ],
  bottomCallout: practitioner.sanctions && practitioner.sanctions.map(sanction => ({
    key: toTitleCase(sanction.issuer) + ' Sanction',
    value: sanction.code
  }))
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
