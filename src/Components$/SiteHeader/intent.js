export default sources => ({
  userMenuClicks$: sources.DOM.select('#userMenu').events('click')
})
