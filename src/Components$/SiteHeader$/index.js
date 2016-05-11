import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import intent from './intent'
import model from './model'

import { SiteHeader } from 'StyleFn'

const { just } = Observable

const _render = ({
  profile,
  isLoggedIn,
  isUserMenuOpen,
  message
}) => div([
  SiteHeader({
    profile,
    isLoggedIn,
    isUserMenuOpen,
    message,
    style: {
      position: 'absolute',
      top: 0,
      width: '100%'
    }
  })
])

export const SiteHeader$ = sources => {
  const actions = intent(sources)
  const state = model(actions, sources)

  const route$ = Observable.merge(
    state.accountSettingsRequest$
  )

  const viewState = {
    profile: sources.userProfile$ || just({}),
    isLoggedIn: sources.isLoggedIn$ || just(true),
    isUserMenuOpen: state.isUserMenuOpen$ || just(false),
    message: sources.message$ || just(null)
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM,
    route$,
    storage: state.signOutRequest$
  }
}
