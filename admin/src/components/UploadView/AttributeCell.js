import React from 'react'
import styled from 'styled-components'
import Validator from '../../utils/validator'

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
  return validations
}

export const AttributeCell = (props) => {
  const {value, attribute} = props

  // Default Value
  if (attribute.default && !value) {
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
