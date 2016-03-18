var faker = require('faker')
var R = require('ramda')

module.exports = {
  create: create,
  merge: merge
}

function merge (locations, organizations, practitioners) {
  return R.map(location => {
    location.organizations = R.map(R.pick(['name', 'address', 'id', 'image']))(R.take(faker.random.number({max: 10}))(organizations))
    location.practitioners = R.map(R.pick(['id', 'prefix', 'first_name', 'last_name', 'image']))(R.take(faker.random.number({max: 10}))(practitioners))
    return location
  })(locations)
}

function create (count) {
  count = count || 10
  var locations = []

  while (count--) {
    locations[count - 1] = {
      'id': count,
      'name': faker.company.companyName(),
      'zwmid': '0982222',
      'last_verified': 'Jan 07, 2016',
      'address': {
        'street': '152nd Ave NE',
        'city': 'Redmond',
        'state': faker.address.stateAbbr(),
        'country': 'United States',
        'geo': {
          'latitude': '47.6696601',
          'longitude': '-122.1916179'
        }
      },
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
      ]
    }
  }

  return locations
}
