import React, {useState} from 'react'
import {Typography} from '@strapi/design-system/Typography'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {Button} from '@strapi/design-system/Button'
import {Box} from '@strapi/design-system/Box';
import styled from "styled-components";
import StringEditor from "./StringEditor";

const Center = styled.div`
  margin: 0 0 20px 0;
  justify-content: center;
  display: flex;
`

const ActionButton = styled(Button)`
  justify-content: center;
  width: 150px;
`

export default function UnSupportType(props) {
  const {meta, onClose, onComplete} = props
  const [showIntro, setIntro] = useState(true)
  return (
    showIntro ?
      <>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Box>
              <Center>
                <Typography size="S" variant={'delta'}>{`UnSupport Type: ${meta.attribute.type}`}</Typography>
              </Center>
              <Center>
                <ActionButton size={'S'} onClick={() => setIntro(false)} variant={'secondary'}>{'Open Text Editor'}</ActionButton>
                &nbsp;
                <Button onClick={onClose}>{'OK'}</Button>
              </Center>
            </Box>
          </Flex>
        </Stack>
      </> : (
        <StringEditor
          meta={meta}
          onCancel={onClose}
          onComplete={(value) => onComplete(value)}
        />
      )
  )
}
