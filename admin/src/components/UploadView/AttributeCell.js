import React from 'react'
import styled from 'styled-components'
import * as Validator from '../../utils/validator'

const ErrorMessage = styled.p`
  color: #e00;
  font-size: 14px;
`

const DefaultValue = styled.span`
  color: #888;
  font-size: 14px;
`

function getValidation(value, attribute) {
  const validations = []
  if (typeof attribute.required !== 'undefined') {
    validations.push(Validator.required)
  }
  if (typeof attribute.maxLength !== 'undefined') {
    validations.push(Validator.maxLength)
  }
  if (typeof attribute.minLength !== 'undefined') {
    validations.push(Validator.minLength)
  }
  if (attribute.type === 'email') {
    validations.push(Validator.email)
  }
  if(attribute.type === 'enumeration'){
    validations.push(Validator.enumeration)
  }
  if (typeof attribute.max !== 'undefined') {
    validations.push(Validator.maxValue)
  }
  if (typeof attribute.min !== 'undefined') {
    validations.push(Validator.minValue)
  }
  return validations
}

const secureTextGuard = (value, type) => {
  if (type === 'password') {
    const password = value ? value : ''
    return password.replace(/./g, '*')
  } else {
    return typeof value === 'undefined' ? null : `${value}`
  }
}

export const AttributeCell = (props) => {
  const {value, attribute} = props

  // Default Value
  if (typeof attribute.default !== 'undefined' && (typeof value === 'undefined' || value === '')) {
    return <DefaultValue>{'Default: '}{`${attribute.default}`}</DefaultValue>
  }

  const validations = getValidation(value, attribute)
  try {
    for (const validator of validations) {
      validator(value, attribute)
    }
  } catch (e) {
    return (
      <>
        {
          secureTextGuard(props.children, attribute.type)
        }
        <ErrorMessage>
          {e.message}
        </ErrorMessage>
      </>

    )
  }
  return secureTextGuard(props.children, attribute.type)
}
