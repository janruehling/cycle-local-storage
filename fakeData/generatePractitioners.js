var faker = require('faker')
var R = require('ramda')

module.exports = {
  create: create,
  merge: merge
}

function merge (practitioners, organizations, locations) {
  return R.map(practitioner => {
    practitioner.organizations = R.map(R.pick(['id', 'name', 'address', 'image']))(R.take(faker.random.number({max: 10}))(organizations))
    practitioner.locations = R.map(R.pick(['name', 'address', 'id']))(R.take(faker.random.number({max: 10}))(locations))
    return practitioner
  })(practitioners)
}

function create (count) {
  count = count || 10
  var practitioners = []
  while (count--) {
    var gender = faker.random.arrayElement([0, 1])
    practitioners[count - 1] = {
      'id': count,
      'prefix': faker.random.arrayElement(['Dr.']),
      'first_name': faker.name.firstName(gender),
      'last_name': faker.name.lastName(gender),
      'nick_name': 'Jon',
      'gender': 'Male',
      'age': '53',
      'zwmid': '0987654',
      'npi': '123456789',
      'image': {
        'src': faker.image.avatar()
      },
      'last_verified': faker.random.arrayElement([faker.date.recent(), 'unverified']),
      'languages': [
        {
          'name': 'English',
          'level': 'Native'
        },
        {
          'name': 'Spanish',
          'level': 'Basic'
        }
      ],
      'medical_school': [
        {
          'name': 'Harvard Medical',
          'graduated': '2001'
        }
      ],
      'residencies': [
        {
          'name': 'Acme Medical Group',
          'id': '1'
        },
        {
          'name': 'XYZ Sports Injury Clinic',
          'id': '2'
        },
        {
          'name': 'A.N Practice',
          'id': '3'
        }
      ],
      'state_license': 'XXX-000',
      'dea_license': '5678912345',
      'specialties': [
        {
          'name': 'Sports Medicine',
          'id': '1',
          'certified': true
        },
        {
          'name': 'General Surgery',
          'id': '2',
          'certified': true
        },
        {
          'name': 'General Practice',
          'id': '3',
          'certified': false
        }
      ],
      'accepts_new_patients': true,
      'accepts_medicaid': true,
      'accepts_medicare': true,
      'medicare_sanction': 'XXX-111',
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
      'biography': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada neque in feugiat egestas. Ut pharetra odio nulla, at pulvinar augue varius vel. Nulla congue suscipit nibh facilisis pretium. Sed maximus tempus volutpat. Aliquam erat volutpat. Suspendisse erat metus, blandit eu arcu ac, auctor tristique mauris. In tristique risus ut vehicula iaculis. Donec fermentum quam id diam ultrices, id rhoncus nisl cursus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis molestie finibus justo, tempus pellentesque nisi. In cursus sed augue sit amet tristique. Donec congue posuere leo eu consectetur. Pellentesque sagittis risus at ligula iaculis, id volutpat lacus consequat. Etiam in elit in nisl euismod tristique. Cras aliquam, nulla eu pellentesque gravida. Mauris rhoncus eleifend felis, id maximus augue. Vestibulum elementum quis erat ac interdum. Nulla ultricies neque commodo tempor molestie. Vestibulum at dignissim quam. In hac habitasse platea dictumst. Integer sit amet condimentum odio. Aenean in nunc libero. Nam in convallis urna. Donec commodo velit ac ante ultricies vehicula. Nunc volutpat nunc in sollicitudin feugiat.'
    }
  }
  return practitioners
}
