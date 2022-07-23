import React, {useState} from 'react'
import {DatePicker} from '@strapi/design-system/DatePicker';
import {TimePicker} from '@strapi/design-system/TimePicker';
import {Box} from '@strapi/design-system/Box'
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import {ActionButton} from "./ActionButton";
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {ValidationMessages} from "./ValidationMessages";

dayjs.extend(utc)

export default function DateTimeEditor(props) {
  const {meta, onCancel, onComplete} = props
  const defaultValue = meta.value ? meta.value : (meta.attribute.default)
  const [date, setDate] = useState(dayjs(defaultValue).toDate())
  const [time, setTime] = useState(dayjs(defaultValue).format('HH:mm:ss'))

  const inputError = typeof date === 'undefined' || typeof time === 'undefined'
  const formatError = (
    typeof date === 'undefined' && typeof time !== 'undefined'
  ) || (
    typeof date !== 'undefined' && typeof time === 'undefined'
  )

  const dateTimeValue = () => {
    if (inputError) {
      return ''
    }
    let hour = 0
    let minute = 0
    if (time && time.includes(':')) {
      const times = time.split(':')
      hour = parseInt(times[0])
      minute = parseInt(times[1])
    }
    const editedValue = dayjs(date).add(hour, 'hour').add(minute, 'minute')
    return editedValue.utc().local().format()
  }

  const onEdited = () => {
    if (typeof date === 'undefined' && typeof time === 'undefined') {
      onComplete('')
      return;
    }
    onComplete(dateTimeValue())
  }

  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <Box>
            <div style={{display: 'flex', alignItems: 'end'}}>
              <DatePicker
                onChange={setDate}
                selectedDate={date}
                label={meta.contentTypeName}
                name="datepicker"
                onClear={() => setDate(undefined)}
                selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`}
              />
              &nbsp;
              <TimePicker
                label={""}
                step={1}
                onClear={() => setTime(undefined)}
                onChange={setTime}
                value={time}
                clearLabel={'Clear the selected time picker value'}
              />
            </div>
            <ValidationMessages attribute={meta.attribute} value={dateTimeValue()}/>
          </Box>
        </Flex>
      </Stack>
      <ActionButton
        error={formatError}
        onCancel={() => onCancel()}
        onComplete={onEdited}
      />
    </>
  )
}
