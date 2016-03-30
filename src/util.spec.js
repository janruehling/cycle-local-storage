/* global describe, it */

import chai from 'chai'
const {expect} = chai

import { Observable } from 'rx'
const {just} = Observable

import { isObservable } from './util'

describe('util', function () {
  describe('isObservable', function () {
    it('should return true if arg is Observable', function () {
      const arg = just()
      const test = isObservable(arg)

      expect(test).to.equal(true)
    })

    it('should return false if arg is null', function () {
      const arg = null
      const test = isObservable(arg)

      expect(test).to.equal(false)
    })

    it('should return false if arg is a string', function () {
      const arg = 'String'
      const test = isObservable(arg)

      expect(test).to.equal(false)
    })

    it('should return false if arg is a regular object', function () {
      const arg = {}
      const test = isObservable(arg)

      expect(test).to.equal(false)
    })
  })
})
