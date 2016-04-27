/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai

import { InputFactory } from './index'

describe('InputFactory', () => {
  it('should throw if no id is passed', () => {
    const input$ = InputFactory()
    const actual = () => input$()

    expect(actual).to.throw(Error)
  })
})
