/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai

import { SelectFactory } from './index'

describe('SelectFactory', () => {
  it('should throw if no id is passed', () => {
    const input$ = SelectFactory()
    const actual = () => input$()

    expect(actual).to.throw(Error)
  })
})
