import { Observable } from 'rx'

export default sources => ({
  userMenuMouseOver$: Observable.merge([
    sources.DOM.select('#userName').events('mouseover'),
    sources.DOM.select('#userMenu').events('mouseover'),
    sources.DOM.select('#userMenuItem').events('mouseover')
  ]),
  userMenuMouseOut$: Observable.merge([
    sources.DOM.select('#userName').events('mouseout'),
    sources.DOM.select('#userMenu').events('mouseout'),
    sources.DOM.select('#userMenuItem').events('mouseout')
  ]),
  signOutClick$: sources.DOM.select('#signOut').events('click'),
  accountSettingsClick$: sources.DOM.select('#accountSettings').events('click'),
  feedbackClick$: sources.DOM.select('#feedback').events('click')
})
