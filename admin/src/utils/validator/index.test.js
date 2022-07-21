'use strict';
const {maxLength, minLength, maxValue, minValue, required} = require('./index')

describe('type-validate', () => {
  test('maxLength', () => {
    expect(() => {
      maxLength("abc", {maxLength: 2})
    }).toThrow('maxLength')

    expect(() => {
      maxLength("abc", {maxLength: 3})
    })
  })

  test('minLength', () => {
    expect(() => {
      minLength("ab", {minLength: 3})
    }).toThrow('minLength')

    expect(() => {
      minLength("abc", {minLength: 3})
    })
  })

  test('min', () => {
    expect(() => {
      minValue(9, {min: 10, type: 'integer'})
    }).toThrow('Lower limit is below')

    expect(() => {
      minValue(10, {min: 10, type: 'integer'})
    })
  })

  test('max', () => {
    expect(() => {
      maxValue(11, {max: 10, type: 'integer'})
    }).toThrow('Upper limit exceeded')

    expect(() => {
      maxValue(10, {max: 10, type: 'integer'})
    })
  })
})
