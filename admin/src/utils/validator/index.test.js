'use strict';
import {enumeration} from "./index";

const {
  maxLength,
  minLength,
  maxValue,
  minValue,
  required,
  email
} = require('./index')

describe('type-validate', () => {
  test('case1 maxLength error', () => {
    expect(() => {
      maxLength("abc", {maxLength: 2})
    }).toThrow('maxLength')
  })
  test('case2 maxLength success', () => {
    expect(() => {
      maxLength("abc", {maxLength: 3})
    })
  })

  test('case2 minLength error', () => {
    expect(() => {
      minLength("ab", {minLength: 3})
    }).toThrow('minLength')
  })
  test('case2 minLength success', () => {
    expect(() => {
      minLength("abc", {minLength: 3})
    })
  })

  test('case3 min error', () => {
    expect(() => {
      minValue(9, {min: 10, type: 'integer'})
    }).toThrow('Lower limit is below')
  })
  test('case3 min success', () => {
    expect(() => {
      minValue(10, {min: 10, type: 'integer'})
    })
  })


  test('case4 max error', () => {
    expect(() => {
      maxValue(11, {max: 10, type: 'integer'})
    }).toThrow('Upper limit exceeded')
  })
  test('case4 max success', () => {
    expect(() => {
      maxValue(10, {max: 10, type: 'integer'})
    })
  })

  test('case5 enum success', () => {
    expect(() => {
      enumeration('hoge', {enum: ['fuga', 'hoge']})
    })
  })
  test('case5 enum not subject', () => {
    expect(() => {
      enumeration('hoge2', {enum: ['fuga', 'hoge']})
    }).toThrow('Invalid value')
  })


  test('email', () => {
    expect(() => {
      email('', {type: 'email'})
    }).toThrow('Incorrect format')

    expect(() => {
      email('example', {type: 'email'})
    }).toThrow('Incorrect format')

    expect(() => {
      email('example@', {type: 'email'})
    }).toThrow('Incorrect format')

    expect(() => {
      email('example@example', {type: 'email'})
    }).toThrow('Incorrect format')

    expect(() => {
      email('123example@example', {type: 'email'})
    }).toThrow('Incorrect format')

    expect(() => {
      email('123@example', {type: 'email'})
    }).toThrow('Incorrect format')

    expect(() => {
      email('123/@example.com', {type: 'email'})
    }).toThrow('Incorrect format')

    expect(() => {
      email('example+test@example.com', {type: 'email'})
    }).toThrow('Incorrect format')

    expect(() => {
      email('example+123@example.com', {type: 'email'})
    }).toThrow('Incorrect format')
  })
})
