import React from 'react'
import {Button} from '@strapi/design-system/Button'
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: 20px 0 0 0;
  justify-content: center;
`

const BaseActionButton = styled(Button)`
  justify-content: center;
  width: 120px;
`

export function ActionButton(props) {
  const {onCancel, onComplete} = props
  return (
    <Wrapper>
      <BaseActionButton onClick={onCancel} variant="tertiary">
        Cancel
      </BaseActionButton>
      &nbsp;
      <BaseActionButton variant="secondary" onClick={onComplete} disabled={!!props.error}>
        OK
      </BaseActionButton>
    </Wrapper>
  )
}
