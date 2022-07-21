import React from 'react'
import styled from 'styled-components'
import * as Validator from '../../utils/validator'

const ErrorMessage = styled.p`
  color: #e00;
  font-size: 14px;
`

function getValidation(value, attribute) {
  const validations = []
  if (typeof attribute.maxLength !== 'undefined') {
    validations.push(Validator.maxLength)
  }
  if (typeof attribute.minLength !== 'undefined') {
    validations.push(Validator.minLength)
  }
  if (typeof attribute.required !== 'undefined') {
    validations.push(Validator.required)
  }
  if (typeof attribute.max !== 'undefined') {
    validations.push(Validator.maxValue)
  }
  if (typeof attribute.min !== 'undefined') {
    validations.push(Validator.minValue)
  }
  return validations
}

export const AttributeCell = (props) => {
  const {value, attribute} = props

  // Default Value
  if (typeof attribute.default !== 'undefined' && !value) {
    return attribute.default
  }

  const validations = getValidation(value, attribute)
  try {
    for (const validator of validations) {
      validator(value, attribute)
    }
  } catch (e) {
    return (
      <>
        {props.children}
        <ErrorMessage>
          {e.message}
        </ErrorMessage>
      </>

    )
  }

  return (
    <>
      {props.children}
    </>
  )
}
