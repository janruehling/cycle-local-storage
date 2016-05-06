import { ENTER_KEY, ESC_KEY } from 'zwUtility'

export default (sources, attributes) => ({
  enterClicks$: sources.DOM.select('#' + attributes.id).events('keyup')
    .filter(ev => ev.keyCode === ENTER_KEY),
  escClicks$: sources.DOM.select('#' + attributes.id).events('keyup')
    .filter(ev => ev.keyCode === ESC_KEY)
})
