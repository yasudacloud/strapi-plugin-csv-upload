import React, {useCallback, useState} from 'react'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {TextInput} from '@strapi/design-system/TextInput';
import {Box} from '@strapi/design-system/Box';
import Eye from '@strapi/icons/Eye'
import {ActionButton} from "./ActionButton";
import {ValidationMessages} from "./ValidationMessages";

export default function SecureTextEditor(props) {
  const {meta, onCancel, onComplete} = props
  const [secure, setSecure] = useState(true)
  const defaultValue = meta.value ? meta.value : meta.attribute.default
  const [text, setText] = useState(defaultValue)

  const onEdited = () => {
    onComplete(text)
  }

  const onClickEye = useCallback(() => {
    setSecure(!secure)
  }, [secure])
  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <Box>
            <form autoComplete={'off'} onSubmit={(e) => e.preventDefault()}>
              <TextInput
                type={secure ? 'password' : 'text'}
                label={meta.contentTypeName}
                name="password"
                onChange={(e) => setText(e.target.value)}
                value={text}
                labelAction={
                  <button type={'button'} onClick={onClickEye} style={{
                    border: 'none',
                    padding: 0,
                    background: 'transparent'
                  }}>
                    <Eye aria-hidden={true}/>
                  </button>
                }
              />
            </form>
            <ValidationMessages attribute={meta.attribute} value={text}/>
          </Box>
        </Flex>
      </Stack>
      <ActionButton
        onCancel={() => onCancel()}
        onComplete={onEdited}
      />
    </>
  )
}
