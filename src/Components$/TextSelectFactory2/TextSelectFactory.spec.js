/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai

import { TextSelectFactory2 } from './index'

describe('TextSelectFactory2', () => {
  it('should throw if no id is passed', () => {
    const input$ = TextSelectFactory2()
    const actual = () => input$()

    expect(actual).to.throw(Error)
  })
})
