/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai

import { CheckboxFactory } from './index'

describe('CheckboxFactory', () => {
  it('should throw if no id is passed', () => {
    const input$ = CheckboxFactory()
    const actual = () => input$()

    expect(actual).to.throw(Error)
  })
})
