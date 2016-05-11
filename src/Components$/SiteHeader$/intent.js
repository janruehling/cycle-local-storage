export default sources => ({
  userMenuMouseOver$: sources.DOM.select('#userName').events('mouseover')
    .merge(sources.DOM.select('#userMenu').events('mouseover'))
    .merge(sources.DOM.select('#userMenuItem').events('mouseover')),
  userMenuMouseOut$: sources.DOM.select('#userName').events('mouseout')
    .merge(sources.DOM.select('#userMenu').events('mouseout'))
    .merge(sources.DOM.select('#userMenuItem').events('mouseout')),
  signOutClick$: sources.DOM.select('#signOut').events('click'),
  accountSettingsClick$: sources.DOM.select('#accountSettings').events('click')
})
