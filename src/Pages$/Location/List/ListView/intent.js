export default sources => ({
  sortTargetClicks$: sources.DOM.select('.sortTarget').events('click')
    .map(ev => ev.ownerTarget.dataset.sortby)
})
