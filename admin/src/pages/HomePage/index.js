import React, {memo, useEffect, useState, useCallback, useRef} from 'react';
import {useIntl} from 'react-intl';
import {BaseHeaderLayout} from '@strapi/design-system/Layout';
import {Box} from '@strapi/design-system/Box'
import {Button} from '@strapi/design-system/Button'
import ContentTypeSelect from '../../components/ContentTypeSelect'
import styled from 'styled-components'
import UploadView from "../../components/UploadView";
import {fetchContentTypeRequest} from "../../utils/http";
import {csvFileReader} from "../../utils/fileReader";
import {stringToContentType} from "../../utils/convert";
import {onActiveContentType, onChangeContentTypes, onChangeCSVData} from '../../state/action';
import {useDispatch, useSelector} from "react-redux";

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
  const dispatch = useDispatch()
  const csv = useSelector((state) => state.csvData);
  const contentTypes = useSelector((state) => state.contentType)
  const fileRef = useRef()

  const onSetCSVData = useCallback((data) => {
    dispatch(onChangeCSVData(data))
  }, [csv])


  useEffect(() => {
    fetchContentTypeRequest().then(response => {
      dispatch(onChangeContentTypes(response.data.data.filter(row => row.schema.visible)))

    })
  }, [])

  const onClickFileUpload = useCallback(() => {
    fileRef.current.click()
  }, [])

  const onChangeFile = async (e) => {
    if (e.target.files.length === 0) {
      return
    }
    const file = e.target.files[0]
    const selectContentType = contentTypes.data.find(value => value.uid === contentTypes.active)

    const headers = Object.keys(selectContentType.schema.attributes)

    // Extract CSV file from File object
    const data = await csvFileReader(file, headers)

    // Convert to the type of the respective content type
    const attributeTypes = {}
    for (const attribute in selectContentType.schema.attributes) {
      attributeTypes[attribute] = selectContentType.schema.attributes[attribute].type
    }
    const contentTypeData = stringToContentType(data, attributeTypes)
    dispatch(onChangeCSVData(contentTypeData))
    fileRef.current.value = ''
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
            value={contentTypes.active}
            contentTypes={contentTypes.data}
            onChange={value => {
              dispatch(onActiveContentType(value))
              onSetCSVData([])
            }}
            onClear={() => {
              dispatch(onActiveContentType(''))
              onSetCSVData([])
            }}
          />
          &nbsp;
          <Button
            style={{margin: '0 0 2px 0'}}
            disabled={!contentTypes.active}
            variant={'secondary'}
            onClick={onClickFileUpload}
          >{formatMessage({id: 'csv-upload.Button.CSVUpload', defaultMessage: 'CSV Upload'})}</Button>
        </NavigationBar>
        {
          contentTypes.active && csv.data.length > 0 &&
          <UploadView
            contentType={contentTypes.data.find(value => value.uid === contentTypes.active)}
            onRefresh={(newCSVData) => onSetCSVData(newCSVData)}
          />
        }
        <HideInputFile ref={fileRef} onChange={onChangeFile}/>
      </Box>
    </Box>
  );
};

export default memo(HomePage);
