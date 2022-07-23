import React, {useState} from 'react'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {TextInput} from '@strapi/design-system/TextInput';
import {Box} from '@strapi/design-system/Box';
import {ActionButton} from "./ActionButton";
import {ValidationMessages} from "./ValidationMessages";

export default function EmailEditor(props) {
  const {meta, onCancel, onComplete} = props
  const defaultValue = meta.value ? meta.value : (meta.attribute.default)
  const [email, setEmail] = useState(defaultValue)
  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <Box>
            <TextInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label={meta.contentTypeName}
              name="email"
            />
            <ValidationMessages attribute={meta.attribute} value={email}/>
          </Box>

        </Flex>
      </Stack>
      <ActionButton
        onCancel={() => onCancel()}
        onComplete={() => onComplete(email)}
      />
    </>
  )
}
