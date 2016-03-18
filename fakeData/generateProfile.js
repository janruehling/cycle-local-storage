var faker = require('faker')
var R = require('ramda')

module.exports = function (organizations) {
  var gender = faker.random.arrayElement([0, 1])
  var organization = faker.random.arrayElement(organizations)
  return {
    'first_name': faker.name.firstName(gender),
    'last_name': faker.name.lastName(gender),
    'title': faker.name.jobTitle(),
    'account': faker.random.arrayElement(['Standard', 'Premium']),
    'last_login': faker.date.recent(),
    'avatar': {
      'src': faker.image.avatar()
    },
    'organization': R.pick(['name', 'last_verified', 'image'])(organization)
  }
}
