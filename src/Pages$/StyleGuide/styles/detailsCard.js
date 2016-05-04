import { toTitleCase } from 'zwUtility'
import { DetailsCard } from 'StyleFn'

import moment from 'moment'

const practitioner = {
  'id': '329bb34df11b11e5ad6d12c4986a8019',
  'prefix': null,
  'first_name': 'A charlotta',
  'middle_name': null,
  'last_name': 'Weaver',
  'image': {
    'id': null,
    'url': null
  },
  'zwmid': 'THW1410',
  'npi': 1124206156,
  'email': null,
  'phone': null,
  'gender': 'Female',
  'dea_license': '12345676',
  'faa_license': null,
  'biography': null,
  'status': 'ACTIVE',
  'accepts_new_patients': true,
  'accepts_medicaid': true,
  'accepts_medicare': false,
  'medical_school': [{
    name: 'Epidemiology, School of Public Health, Boston University'
  },
    {
      name: 'Maulana Azad Medical College, Delhi University, India',
      graduated: '1970'
    }],
  'languages': [
    {
      id: 'english',
      level: 'native'
    }
  ],
  'specialties': [
    'INTERNAL_MEDICINE'
  ],
  'degrees': [],
  'board_certifications': [],
  'fellowships': [],
  'residencies': [{
    name: 'Good Samaritan',
    link: '#'
  },
    {
      name: 'Hospital, Baltimor, MD',
      link: '#'
    }],
  'sanctions': [],
  'works_at': {
    'location': {
      'id': 'd78161cef11911e5ad6d12c4986a8019',
      'name': 'NORTHWESTERN MEDICAL FACULTY FOUNDATION',
      'state': 'IL'
    },
    'plan': {
      'id': '317acff2f11711e5ad6d12c4986a8019',
      'name': 'Medicare'
    },
    'group': {
      'id': 'd77ea108f11911e5ad6d12c4986a8019',
      'name': 'NORTHWESTERN MEDICAL FACULTY FOUNDATION'
    }
  },
  'last_verified': '2016-02-07T20:01:00+02:00',
  'state_license': 'MD.MD.62298409'
}

// const location = {
//   'id': 'f1708219f11711e5ad6d12c4986a8019',
//   'name': '1-ON-1 MD, LLC',
//   'images': [],
//   'description': null,
//   'zwmid': 'OL12270',
//   'contact': {},
//   'belongs_to_groups': [
//     {
//       'id': 'f16cdb66f11711e5ad6d12c4986a8019',
//       'name': '1-ON-1 MD, LLC'
//     }
//   ],
//   'address': {
//     'street_address': '1030 N CLARK ST SUITE 310',
//     'city': 'CHICAGO',
//     'state': 'IL',
//     'zipcode': '60610-5470',
//     'country': 'USA',
//     'coordinates': {
//       'latitude': 41.903294,
//       'longitude': -87.633565
//     }
//   },
//   'offers_plans': [
//     {
//       'id': '317acff2f11711e5ad6d12c4986a8019',
//       'name': 'Medicare'
//     }
//   ]
// }

const children = [{
  name: '',
  fn: DetailsCard({
    topCallout: (practitioner.last_verified && moment(practitioner.last_verified).isValid())
      ? {
        key: 'Last Verified:',
        value: moment(practitioner.last_verified).format('MMM D, Y'),
        tick: true
      } : null,
    title: (practitioner.first_name ? practitioner.first_name : '') +
      (practitioner.middle_name ? ' ' + practitioner.middle_name : '') +
      (practitioner.last_name ? ' ' + practitioner.last_name : ''),
    subTitle: 'M.D, MSc',
    image: {
      src: null,
      icon: toTitleCase(practitioner.gender)
    },
    meta: [
      {
        key: null,
        value: (practitioner.gender ? practitioner.gender : '') + (practitioner.age ? ', ' + practitioner.age : '')
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
        items: practitioner.languages ? practitioner.languages.map(language => ({
          text: toTitleCase(language.id) + (language.level ? ' (' + toTitleCase(language.level) + ')' : '')
        })) : null
      },
      {
        title: 'Medical School:',
        items: practitioner.medical_school ? practitioner.medical_school.map(school => ({
          text: school.name + (school.graduated ? ', ' + school.graduated : '')
        })) : null
      },
      {
        title: 'Residencies:',
        items: practitioner.residencies ? practitioner.residencies.map(residency => ({
          text: residency.name,
          link: residency.link
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
  })
}]

const detailsCard = {
  name: 'DetailsCard',
  children: children,
  style: {
    marginRight: '100px',
    width: '290px'
  }
}

export default detailsCard
