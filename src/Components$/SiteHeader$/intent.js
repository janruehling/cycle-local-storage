export default sources => ({
  userMenuMouseOver$: sources.DOM.select('#userMenu').events('mouseenter'),
  userMenuMouseOut$: sources.DOM.select('#userMenu').events('mouseleave')
})
