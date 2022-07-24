import React, {useState} from 'react'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {Box} from '@strapi/design-system/Box'
import {TextInput} from '@strapi/design-system/TextInput';
import {ActionButton} from "./ActionButton";
import {ValidationMessages} from "./ValidationMessages";

export default function NumberEditor(props) {
  const {meta, onCancel, onComplete} = props
  const defaultValue = meta.value ? meta.value : (meta.attribute.default)
  const [number, setNumber] = useState(defaultValue)

  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <Box>
            <TextInput
              onChange={(e) => setNumber(e.target.value)}
              type={'number'}
              label={meta.contentTypeName}
              value={number}
              name="number"
              onClear={() => setNumber(undefined)}
            />
            <ValidationMessages attribute={meta.attribute} value={number}/>
          </Box>
        </Flex>
      </Stack>
      <ActionButton
        onCancel={() => onCancel()}
        onComplete={() => {
          if(typeof number === 'undefined' || number === ''){
            onComplete(undefined)
          }else{
            onComplete(number)
          }
        }}
      />
    </>
  )

}
