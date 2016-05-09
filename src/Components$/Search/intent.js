export default sources => {
  const { DOM } = sources
  return {
    resultClicks$: DOM.select('.result').events('click')
  }
}
