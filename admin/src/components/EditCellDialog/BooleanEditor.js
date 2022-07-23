import React, {useState} from 'react'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {Box} from '@strapi/design-system/Box';
import {ToggleInput} from '@strapi/design-system/ToggleInput';
import {ActionButton} from "./ActionButton";
import {ValidationMessages} from "./ValidationMessages";

export default function BooleanEditor(props) {
  const {meta, onCancel, onComplete} = props
  const defaultValue = meta.value ? meta.value : meta.attribute.default
  const [isValue, setValue] = useState(defaultValue)
  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <Box>
            <ToggleInput
              label={meta.contentTypeName}
              name="enable-provider"
              onLabel="True"
              offLabel="False"
              checked={isValue}
              onChange={e => setValue(e.target.checked)}
            />
            <ValidationMessages attribute={meta.attribute} value={isValue}/>
          </Box>
        </Flex>
      </Stack>
      <ActionButton
        onCancel={() => onCancel()}
        onComplete={() => onComplete(isValue)}
      />
    </>
  )
}
