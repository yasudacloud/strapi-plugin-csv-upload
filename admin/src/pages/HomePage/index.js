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
import {onActiveContentType, onChangeContentTypes, onChangeCSVData, onContextError} from '../../state/action';
import {useDispatch, useSelector} from "react-redux";

const NavigationBar = styled.div`
  align-items: end;
  display: flex;
  margin: 0 0 5px 0;
  max-width: 1000px;
`

const HeaderText = styled.span`
  color: #888;
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

    try {
      // Extract CSV file from File object
      const data = await csvFileReader(file, headers)

      // Convert to the type of the respective content type
      const attributeTypes = {}
      for (const attribute in selectContentType.schema.attributes) {
        attributeTypes[attribute] = selectContentType.schema.attributes[attribute].type
      }
      const contentTypeData = stringToContentType(data, attributeTypes)
      dispatch(onChangeCSVData(contentTypeData))
    } catch (e) {
      const message = typeof e === 'string' ? e : e.message
      console.error(message)
      dispatch(onContextError({
        message
      }))
    } finally {
      fileRef.current.value = ''
    }
  }
  return (
    <>
      <BaseHeaderLayout
        title="CSV Upload"
        as="h2"
      />
      <Box paddingLeft={10} paddingRight={10} paddingTop={2}>
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
        {
          contentTypes.active && csv.data.length === 0 && (() => {
            const activeContentType = contentTypes.data.find(contentType => contentType.uid === contentTypes.active)
            const headers = activeContentType ? Object.keys(activeContentType.schema.attributes) : []
            return (<HeaderText>{headers.join(', ')}</HeaderText>)
          })()
        }
        <HideInputFile ref={fileRef} onChange={onChangeFile}/>
      </Box>
    </>
  );
}

export default memo(HomePage);
