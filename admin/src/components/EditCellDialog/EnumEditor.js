import React, {useState} from 'react'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {Box} from '@strapi/design-system/Box';
import {Select, Option} from '@strapi/design-system/Select';
import {ActionButton} from "./ActionButton";
import {ValidationMessages} from "./ValidationMessages";

export default function EnumEditor(props) {
  const {meta, onCancel, onComplete} = props
  const defaultValue = meta.value ? meta.value : (meta.attribute.default)
  const [value, setValue] = useState(defaultValue)
  const onChange = (selectValue) => {
    setValue(selectValue)
  }
  const onClear = () => {
    setValue(undefined)
  }
  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <Box>
            <Select
              value={value}
              onClear={() => onClear(undefined)}
              onChange={onChange}
            >
              {
                meta.attribute.enum.map(enumValue => (
                    <Option
                      key={enumValue}
                      value={enumValue}
                    >{enumValue}</Option>
                  )
                )
              }
            </Select>
            <ValidationMessages attribute={meta.attribute} value={value}/>
          </Box>
        </Flex>
      </Stack>
      <ActionButton
        onCancel={() => onCancel()}
        onComplete={() => onComplete(value)}
      />
    </>
  )
}
