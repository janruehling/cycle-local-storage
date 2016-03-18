var generateProfile = require('./generateProfile')
var generatePractitioners = require('./generatePractitioners')
var generateOrganizations = require('./generateOrganizations')
var generateLocations = require('./generateLocations')

module.exports = function () {
  var practitioners = generatePractitioners.create()
  var organizations = generateOrganizations.create()
  var locations = generateLocations.create()

  var data = {
    practitioners: generatePractitioners.merge(practitioners, organizations, locations),
    groups: generateOrganizations.merge(organizations, locations, practitioners),
    locations: generateLocations.merge(locations, organizations, practitioners),
    profile: generateProfile(organizations)
  }

  return data
}
