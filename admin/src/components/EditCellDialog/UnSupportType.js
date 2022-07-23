import React from 'react'
import {Typography} from '@strapi/design-system/Typography'
import {Button} from '@strapi/design-system/Button'

export default function UnSupportType(props) {
  const {type, onClose} = props
  return (
    <>
      <Typography>{`UnSupport Type: ${type}`}</Typography>
      <Button onClick={onClose}>{'OK'}</Button>
    </>
  )
}
