import React, {memo, useEffect, useState, useCallback, useRef} from 'react';
import {useIntl} from 'react-intl';
import {BaseHeaderLayout} from '@strapi/design-system/Layout';
import {Box} from '@strapi/design-system/Box'
import {Button} from '@strapi/design-system/Button'
import ContentTypeSelect from '../../components/ContentTypeSelect'
import styled from 'styled-components'
import UploadView from "../../components/UploadView";
import {fetchContentTypeRequest} from "../../utils/http";

const NavigationBar = styled.div`
  align-items: end;
  display: flex;
  margin: 0 0 30px 0;
  max-width: 1000px;
`

const HideInputFile = styled.input`
  border: 0 solid #fff;
  width: 1px;
  height: 1px;
  visibility: hidden;
`
HideInputFile.defaultProps = {
  type: 'file',
  accept: 'text/csv'
}

const HomePage = () => {
  const {formatMessage} = useIntl();
  const [contentTypes, setContentTypes] = useState([])
  const [contentType, setContentType] = useState(undefined)
  const [csvData, setCSVData] = useState([])
  const fileRef = useRef()

  useEffect(() => {
    fetchContentTypeRequest().then(response => {
      setContentTypes(response.data.data.filter(row => row.schema.visible).slice())
    })
  }, [])

  const onClickFileUpload = useCallback(() => {
    fileRef.current.click()
  }, [contentType])

  const onChangeFile = (e) => {
    if (e.target.files.length === 0) {
      return
    }
    const file = e.target.files[0]
    const fileReader = new FileReader();
    fileReader.readAsText(file)
    fileReader.onload = () => {
      const lines = fileReader.result.split('\n')
      const data = []
      lines.forEach(line => {
        if (!line) {
          return
        }
        const newLine = line.split(',')
        if (newLine.length > 0) {
          data.push(newLine)
        }
      })
      setCSVData(data.slice(0))
      fileRef.current.value = ''
    }
  }

  return (
    <Box>
      <BaseHeaderLayout
        title="CSV Upload"
        as="h2"
      />
      <Box padding={5}>
        <NavigationBar>
          <ContentTypeSelect
            value={contentType}
            contentTypes={contentTypes}
            onChange={value => {
              setContentType(value)
              setCSVData([])
            }}
            onClear={() => {
              setContentType(undefined)
              setCSVData([])
            }}
          />
          &nbsp;
          <Button
            style={{margin: '0 0 2px 0'}}
            disabled={!contentType}
            onClick={onClickFileUpload}
          >{formatMessage({id: 'csv-upload.Button.CSVUpload', defaultMessage: 'CSV Upload'})}</Button>
        </NavigationBar>
        {
          contentType && csvData.length > 0 &&
          <UploadView
            contentType={contentTypes.find(value => value.uid === contentType)}
            csvData={csvData}
            onClose={() => setCSVData([])}
            onRefresh={(newCSVData) => setCSVData(newCSVData.slice())}
          />
        }
        <HideInputFile ref={fileRef} onChange={onChangeFile}/>
      </Box>
    </Box>
  );
};

export default memo(HomePage);
