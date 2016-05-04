/* global describe, it */

import chai from 'chai'
const {expect} = chai

import { _getChangeObject } from './index'
import constants from 'constants.css'

describe('Dash Landing', () => {
  describe('_getChangeObject', () => {
    it('should create expected show "+3 this week" if positive', () => {
      const arg = '3'
      const actual = _getChangeObject(arg)
      const expected = {
        style: {
          backgroundColor: constants.color4
        },
        text: '+3 this week'
      }

      expect(actual).to.eql(expected)
    })

    it('should create expected show "+/- 0 this week" if zero', () => {
      const arg = '0'
      const actual = _getChangeObject(arg)
      const expected = {
        text: '+/- 0 this week'
      }

      expect(actual).to.eql(expected)
    })

    it('should create expected show "-3 this week" if negative', () => {
      const arg = -3
      const actual = _getChangeObject(arg)
      const expected = {
        style: {
          backgroundColor: constants.color2
        },
        text: '-3 this week'
      }

      expect(actual).to.eql(expected)
    })

    it('should give back null if invalid input', () => {
      const arg = 'This is a string'
      const actual = _getChangeObject(arg)
      const expected = null

      expect(actual).to.equal(expected)
    })
  })
})
