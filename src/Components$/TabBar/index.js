import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'

import { Tabs, Tab } from 'StyleFn'

const _render = ({
  tabs,
  createHref,
  router
}) =>
    Tabs({}, tabs.map(({path, label}) => {
      const link = createHref(path)
      const hashedRoute = '#' + router.pathname

      return Tab({
        id: label,
        isActive: hashedRoute === link,
        link: link
      }, label)
    }
))

export const TabBar = sources => {
  const viewState = {
    tabs: sources.tabs,
    createHref: Observable.just(sources.router.createHref),
    router: sources.router.observable
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM
  }
}
