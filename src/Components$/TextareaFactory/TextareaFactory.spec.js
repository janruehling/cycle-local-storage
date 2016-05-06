/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai

import { TextareaFactory } from './index'

describe('TextareaFactory', () => {
  it('should throw if no id is passed', () => {
    const input$ = TextareaFactory()
    const actual = () => input$()

    expect(actual).to.throw(Error)
  })
})
