import React, {memo} from 'react'
import styled from "styled-components";
import {Typography} from '@strapi/design-system/Typography'
import Check from '@strapi/icons/Check'
import Pencil from '@strapi/icons/Pencil'
import * as Validator from '../../utils/validator'

const List = styled.ul`
  margin: 10px 0 0 0;

  & > li {
    color: #888;
    padding: 4px 0 0 0;
  }
`

const Message = styled.li`
  & > span {
    color: ${props => props.error ? '#e00' : '#888'};
    vertical-align: middle;
  }

  & svg path {
    fill: ${props => props.error ? '#e00' : '#888'};
  }
`

const ValidateIcon = ({error}) => {
  const style = {fontSize: 14}
  const Component = error ? Pencil : Check
  return (
    <span>{<Component style={style}/>}</span>
  )
}

const ValidateText = ({text}) => <span>{text}</span>

export const ValidationMessages = memo((props) => {
  const {attribute, value} = props
  const isRequiredError = value === undefined || value === ''
  const isMaxLengthError = value && value.length > attribute.maxLength
  const isMinLengthError = value && value.length < attribute.minLength
  const isMaxError = value && value > attribute.max
  const isMinError = value && value < attribute.min

  const emailInValid = () => {
    try {
      Validator.email(value)
      return false
    } catch (e) {
      return true
    }
  }
  const isEmailError = attribute.type === 'email' && emailInValid()
  return (
    <List>
      {
        typeof attribute.default !== 'undefined' && (
          <Typography>{`Default: ${attribute.default}`}</Typography>
        )
      }
      {
        attribute.type === 'email' && (
          <Message error={isEmailError}>
            <ValidateIcon error={isEmailError}/>&nbsp;<ValidateText text={'Email address format'}/>
          </Message>
        )
      }
      {
        typeof attribute.required !== 'undefined' && (
          <Message error={isRequiredError}>
            <ValidateIcon error={isRequiredError}/>&nbsp;<ValidateText text={'required'}/>
          </Message>
        )
      }
      {
        typeof attribute.maxLength !== 'undefined' && (
          <Message error={isMaxLengthError}>
            <ValidateIcon error={isMaxLengthError}/>&nbsp;
            <ValidateText text={`maxLength: ${attribute.maxLength}`}/>
          </Message>
        )
      }
      {
        typeof attribute.minLength !== 'undefined' && (
          <Message error={isMinLengthError}>
            <ValidateIcon error={isMinLengthError}/>&nbsp;
            <ValidateText text={`minLength: ${attribute.minLength}`}/>
          </Message>
        )
      }
      {
        typeof attribute.max !== 'undefined' && (
          <Message error={isMaxError}>
            <ValidateIcon error={isMaxError}/>&nbsp;
            <ValidateText text={`max: ${attribute.max}`}/>
          </Message>
        )
      }
      {
        typeof attribute.min !== 'undefined' && (
          <Message error={isMinError}>
            <ValidateIcon error={isMinError}/>&nbsp;
            <ValidateText text={`min: ${attribute.min}`}/>
          </Message>
        )
      }
    </List>
  )
})
