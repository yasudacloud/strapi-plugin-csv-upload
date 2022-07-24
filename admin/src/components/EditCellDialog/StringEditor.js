import React, {useState} from 'react'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {TextInput} from '@strapi/design-system/TextInput';
import {Box} from '@strapi/design-system/Box';
import {Textarea} from '@strapi/design-system/Textarea';
import {ActionButton} from "./ActionButton";
import {ValidationMessages} from "./ValidationMessages";

export default function StringEditor(props) {
  const {meta, multiline, onCancel, onComplete} = props
  const defaultValue = meta.value ? meta.value : (meta.attribute.default)
  const [text, setText] = useState(defaultValue)
  const TextComponent = multiline ? Textarea : TextInput
  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <Box>
            <TextComponent
              onChange={(e) => setText(e.target.value)}
              value={text}
              label={meta.contentTypeName}
              name="text"
            />
            <ValidationMessages attribute={meta.attribute} value={text}/>
          </Box>
        </Flex>
      </Stack>
      <ActionButton
        onCancel={() => onCancel()}
        onComplete={() => onComplete(text)}
      />
    </>
  )
}
