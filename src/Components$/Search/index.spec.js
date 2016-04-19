/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai
import { div, span } from '@cycle/dom'

import { _highlightText } from './index'

describe('Search', () => {
  describe('_highlightText', () => {
    it('should highlight matching text', () => {
      const string = 'This is the test string'
      const match = 'his'
      const actual = _highlightText(string, match)
      const expected = div({
        style: {
          display: 'inline-block'
        }
      }, [
        span('T'),
        span({
          style: {
            background: 'yellow'
          }
        }, 'his'),
        span(' is the test string')
      ])

      expect(actual).to.look.like(expected)
    })

    it('should return the original string wrapped if no match is found', () => {
      const string = 'This is the test string'
      const match = 'blah'
      const actual = _highlightText(string, match)
      const expected = div({
        style: {
          display: 'inline-block'
        }
      }, [
        span('This is the test string')
      ])

      expect(actual).to.look.like(expected)
    })
  })
})
