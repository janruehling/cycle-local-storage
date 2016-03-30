import { Tabs, Tab } from 'StyleFn'

const _DOM = createHref => _tabs =>
  tabs({}, _tabs.map(({path, label}) =>
    tab({id: label, link: createHref(path)}, label)
  ))

export const TabBar = sources => {
  const navigate$ = sources.DOM.select('.tab-label-content')
    .events('click')
    .map(event => event.ownerTarget.dataset.link)
    .distinctUntilChanged()

  const DOM = sources.tabs.map(_DOM(sources.router.createHref))

  return {
    DOM,
    route$: navigate$,
  }
}
