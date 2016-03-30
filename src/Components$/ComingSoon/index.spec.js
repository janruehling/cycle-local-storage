/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai

import {Observable} from 'rx'
const {just} = Observable

import { h4 } from '@cycle/dom'

import { ComingSoon } from './index'

describe('ComingSoon', function () {
  it('should return a function', function () {
    const result = ComingSoon('Test')
    expect(result).to.be.a('function')
  })

  it('should return the right snippet when the function is called', function () {
    const result = ComingSoon('Test')()
    const expected = {
      DOM: just(h4('Coming Soon: Test'))
    }
    expect(result).to.eql(expected)
  })
})
