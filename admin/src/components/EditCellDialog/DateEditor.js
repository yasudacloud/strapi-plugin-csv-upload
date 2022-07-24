import React, {useState} from 'react'
import {DatePicker} from '@strapi/design-system/DatePicker';
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import dayjs from "dayjs";
import {ActionButton} from "./ActionButton";

export default function DateEditor(props) {
  const {meta, onCancel, onComplete} = props
  const defaultValue = meta.value ? meta.value : (meta.attribute.default)
  const [date, setDate] = useState(dayjs(defaultValue).toDate())

  const onEdited = () => {
    if (typeof date === 'undefined') {
      onComplete('')
    } else {
      const editedValue = dayjs(date)
      const langFormatter = new Intl.DateTimeFormat();
      onComplete(langFormatter.format(editedValue))
    }
  }
  return (
    <>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <DatePicker
            onChange={setDate}
            selectedDate={date}
            label={meta.contentTypeName}
            name="datepicker"
            onClear={() => setDate(undefined)}
            selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`}
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
