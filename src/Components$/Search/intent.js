export default sources => {
  const { DOM } = sources
  return {
    resultClicks$: DOM.select('.resultRow').events('click')
  }
}
