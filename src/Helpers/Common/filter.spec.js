/* global describe, it */

import chai from 'chai'
chai.use(require('chai-virtual-dom'))
const {expect} = chai

import { filterChangedFields } from './filter'

describe('filterChangedFields', () => {
  it('should throw if no arguments are passed', () => {
    const actual = () => filterChangedFields()

    expect(actual).to.throw(Error)
  })

  it('should throw if only one argument is passed', () => {
    const actual = () => filterChangedFields({})

    expect(actual).to.throw(Error)
  })

  it('should throw if the first argument is not an object', () => {
    const actual = () => filterChangedFields('', {})

    expect(actual).to.throw(Error)
  })

  it('should throw if the second argument is not an object', () => {
    const actual = () => filterChangedFields({}, '')

    expect(actual).to.throw(Error)
  })

  it('should filter out not changed properties', () => {
    const newObj = {
      unchanged: 'Unchanged',
      changed: 'New Value'
    }
    const originalObj = {
      unchanged: 'Unchanged',
      changed: 'Old Value'
    }
    const actual = filterChangedFields(newObj, originalObj)
    const expected = {
      changed: 'New Value'
    }

    expect(actual).to.eql(expected)
  })
})
