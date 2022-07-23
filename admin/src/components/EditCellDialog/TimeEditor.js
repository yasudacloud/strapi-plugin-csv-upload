import React, {useState} from 'react'
import {TimePicker} from '@strapi/design-system/TimePicker';
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {ActionButton} from "./ActionButton";
import {timeToFullTimeFormat} from "../../utils/convert";

export default function TimeEditor(props) {
  const {meta, onCancel, onComplete} = props
  const defaultValue = (typeof meta.value !== 'undefined' && meta.value !== '') ? meta.value : (meta.attribute.default)
  const [time, setTime] = useState(`${defaultValue}:00`)
  const onEdited = () => {
    onComplete(timeToFullTimeFormat(time))
  }

  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <TimePicker
            value={time}
            onChange={(value) => {
              setTime(value)
            }}
            step={1}
            selectedDate={time}
            label={meta.contentTypeName}
            name="time"
            clearLabel={'Clear the selected time picker value'}
            onClear={() => setTime('00:00:00.000')}
          />
        </Flex>
      </Stack>
      <ActionButton
        onCancel={() => onCancel()}
        onComplete={onEdited}
      />
    </>
  )
}
