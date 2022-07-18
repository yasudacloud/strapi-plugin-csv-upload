import React from 'react';
import {useIntl} from 'react-intl';
import styled from 'styled-components'
import {Select, Option} from '@strapi/design-system/Select';

const ContentTypeSelect = styled.div`
  display: inline-block;
  vertical-align: bottom;
`

export default function (props) {
  const {
    value,
    contentTypes,
    loading,
    onChange,
    onClear
  } = props
  const {formatMessage} = useIntl();
  return (
    <ContentTypeSelect>
      <Select
        id="select1"
        label={formatMessage({id: 'csv-upload.Select.CollectionType.Label', defaultMessage: 'Select Collection Type'})}
        required
        placeholder=""
        disabled={loading}
        value={value}
        onClear={() => onClear(undefined)}
        onChange={onChange}
      >
        {
          contentTypes.map(contentType => (
              <Option
                key={contentType.uid}
                value={contentType.uid}
              >{contentType.schema.displayName}</Option>
            )
          )
        }
      </Select>
    </ContentTypeSelect>
  )
}
