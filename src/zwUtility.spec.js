/* global describe, it */

import chai from 'chai'
const {expect} = chai

import { Observable } from 'rx'
const {just} = Observable

import { isObservable, getName, toTitleCase } from './zwUtility'

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

  describe('getName', function () {
    it('should combine a persons name', function () {
      const arg = {
        first_name: 'Jan',
        middle_name: 'C',
        last_name: 'Ruehling'
      }
      const test = getName(arg)
      const expected = 'Jan C Ruehling'

      expect(test).to.equal(expected)
    })

    it('should combine a group name', function () {
      const arg = {
        name: 'Group Name'
      }
      const test = getName(arg)
      const expected = 'Group Name'

      expect(test).to.equal(expected)
    })

    it('should prefer the name when present', function () {
      const arg = {
        name: 'DisplayName',
        first_name: 'Jan',
        middle_name: 'C',
        last_name: 'Ruehling'
      }
      const test = getName(arg)
      const expected = 'DisplayName'

      expect(test).to.equal(expected)
    })

    it('should trim empty spaces from the string', function () {
      const arg = {
        first_name: 'Jan',
        middle_name: 'C'
      }
      const test = getName(arg)
      const expected = 'Jan C'

      expect(test).to.equal(expected)
    })

    it('should return an empty string if no args are given', function () {
      const test = getName()
      const expected = ''

      expect(test).to.equal(expected)
    })

    it('should return an empty string if invalid args are given', function () {
      const arg = null
      const test = getName(arg)
      const expected = ''

      expect(test).to.equal(expected)
    })
  })

  describe('toTitleCase', function () {
    it('should convert all uppercase', function () {
      const arg = 'AMSTERDAM MEMORIAL HOSPITAL'
      const test = toTitleCase(arg)
      const expected = 'Amsterdam Memorial Hospital'

      expect(test).to.equal(expected)
    })

    it('should convert underscores', function () {
      const arg = 'CLINICAL_SOCIAL_WORKER'
      const test = toTitleCase(arg)
      const expected = 'Clinical Social Worker'

      expect(test).to.equal(expected)
    })

    it('should add a whitespace after clamped together words with a dot', function () {
      const arg = 'My.example'
      const test = toTitleCase(arg)
      const expected = 'My. Example'

      expect(test).to.equal(expected)
    })
  })
})
