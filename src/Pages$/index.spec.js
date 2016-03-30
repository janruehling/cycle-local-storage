/* global describe, it */

import chai from 'chai'
const {expect} = chai

import { Observable } from 'rx'
const {just} = Observable

import { AuthRedirectManager, UserManager } from './index'

describe('Page$', function () {
  describe('AuthRedirectManager', function () {
    it('should be defined', function () {
      expect(AuthRedirectManager).to.be.defined
    })

    it('should redirect to /admin if the user is admin', function () {
      const sources = {
        userProfile$: just({
          isAdmin: true
        }),
        auth$: just(null),
        router$: just(null)
      }
      const test = AuthRedirectManager(sources)

      test.redirectLogin$.subscribe(
        redirect => {
          expect(redirect).to.equal('/admin')
        }
      )
    })

    it('should redirect to /dash if the user is not admin', function () {
      const sources = {
        userProfile$: just({
          isAdmin: false
        }),
        auth$: just(null)
      }
      const test = AuthRedirectManager(sources)

      test.redirectLogin$.subscribe(
        redirect => {
          expect(redirect).to.equal('/dash')
        }
      )
    })

    it('should redirect to / if the user has no profile (is logged out)', function () {
      const sources = {
        userProfile$: just(null),
        auth$: just(null)
      }
      const test = AuthRedirectManager(sources)

      test.redirectLogout$.subscribe(
        redirect => {
          expect(redirect).to.equal('/')
        }
      )
    })
  })

  describe('UserManager', function () {
    it('should be defined', function () {
      expect(UserManager).to.be.defined
    })

    // it('should emit a just Observable with value null if no auth present', function () {
    //   const sources = {
    //     auth$: just(false),
    //     config$: just({
    //       api: ''
    //     })
    //   }
    //   const test = UserManager(sources)
    //
    //   test.userProfile$.subscribe(
    //     redirect => {
    //       expect(redirect).to.equal(null)
    //     }
    //   )
    // })
  })
})
