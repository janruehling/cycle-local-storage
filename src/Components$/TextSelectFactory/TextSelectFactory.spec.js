/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai

import { TextSelectFactory } from './index'

describe('TextSelectFactory', () => {
  it('should throw if no id is passed', () => {
    const input$ = TextSelectFactory()
    const actual = () => input$()

    expect(actual).to.throw(Error)
  })
})
