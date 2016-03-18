var faker = require('faker')
var R = require('ramda')

module.exports = {
  create: create,
  merge: merge
}

function merge (organizations, locations, practitioners) {
  return R.map(organization => {
    organization.locations = R.map(R.pick(['name', 'address', 'id']))(R.take(faker.random.number({max: 10}))(locations))
    organization.practitioners = R.map(R.pick(['id', 'prefix', 'first_name', 'last_name', 'image']))(R.take(faker.random.number({max: 10}))(practitioners))
    return organization
  })(organizations)
}

function create (count) {
  count = count || 10
  var organizations = []

  while (count--) {
    organizations[count - 1] = {
      'id': count,
      'name': faker.company.companyName(),
      'zwmid': '09888866',
      'npi': '334567800',
      'image': {
        'src': faker.image.business()
      },
      'last_verified': 'Jan 07, 2016',
      'type': 'Retail Clinic',
      'legal_structure': 'LLP',
      'irs_ein': 'XX-11102x',
      'address': {
        'state': faker.address.stateAbbr()
      },
      'belongs_to': [
        {
          'zwmid': '0987654',
          'id': 1
        },
        {
          'zwmid': '0982245',
          'id': 2
        },
        {
          'zwmid': '0988854',
          'id': 3
        }
      ],
      'plans': [
        {
          'name': 'ABC Sports Injury Care',
          'id': '1'
        },
        {
          'name': 'Perfect Fitness Recovery',
          'id': '2'
        },
        {
          'name': 'General Care Gold 101',
          'id': '3'
        }
      ],
      'activities': [
        {
          'date': 'February 2, 2016',
          'text': 'Added to Zipwire',
          'id': '1'
        },
        {
          'date': 'February 2, 2016',
          'text': 'Medical License Verified',
          'id': '2'
        },
        {
          'date': 'February 4, 2016',
          'text': 'Photo Added',
          'id': '3'
        },
        {
          'date': 'February 21, 2016',
          'text': "Location 'Amber Clinic' added",
          'id': '4'
        },
        {
          'date': 'February 29, 2016',
          'text': "Location 'Spine Clinic' added",
          'id': '5'
        }
      ],
      'profile': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada neque in feugiat egestas. Ut pharetra odio nulla, at pulvinar augue varius vel. Nulla congue suscipit nibh facilisis pretium. Sed maximus tempus volutpat. Aliquam erat volutpat. Suspendisse erat metus, blandit eu arcu ac, auctor tristique mauris. In tristique risus ut vehicula iaculis. Donec fermentum quam id diam ultrices, id rhoncus nisl cursus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla elementum sed felis sed accumsan. Vestibulum finibus convallis bibendum. Duis molestie finibus justo, tempus pellentesque nisi. In cursus sed augue sit amet tristique. Donec congue posuere leo eu consectetur. Pellentesque sagittis risus at ligula iaculis, id volutpat lacus consequat. Etiam in elit in nisl euismod tristique. Cras aliquam, nulla eu pellentesque gravida, augue est lobortis arcu, non tincidunt nisl mi eget tortor. Mauris rhoncus eleifend felis, id maximus augue. Vestibulum elementum quis erat ac interdum.'
    }
  }

  return organizations
}
