import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import styled from 'styled-components'
import {Table, Thead, Tbody, Tr, Td, Th} from '@strapi/design-system/Table';
import {Typography} from '@strapi/design-system/Typography'
import {ModalLayout, ModalBody, ModalHeader, ModalFooter} from '@strapi/design-system/ModalLayout';
import {Button} from '@strapi/design-system/Button'
import {IconButton} from '@strapi/design-system/IconButton';
import Trash from '@strapi/icons/Trash'
import {saveRequest} from '../../utils/http'
import UploadViewDialog from "../UploadViewDialog";

/**
 * @type {{Complete: number, Prepare: number, Saving: number}}
 */
const ProgressType = {
  Prepare: 1,
  Saving: 2,
  Complete: 3
}

function statusToMessage(status) {
  const {formatMessage} = useIntl();
  if (!status) {
    return null
  }
  let message;
  switch (status) {
    case 200:
      message = formatMessage({
        id: 'csv-upload.Http.NoContent',
        defaultMessage: 'Saved'
      });
      break;
    case 204:
      message = formatMessage({
        id: 'csv-upload.Http.NoContent',
        defaultMessage: 'Saved'
      });
      break;
    case 400:
      message = formatMessage({
        id: 'csv-upload.Http.BadRequest',
        defaultMessage: 'Bad Request'
      });
      break;
    case 401:
      message = formatMessage({
        id: 'csv-upload.Http.Unauthorized',
        defaultMessage: 'Unauthorized'
      });
      break;
    case 403:
      message = formatMessage({
        id: 'csv-upload.Http.Forbidden',
        defaultMessage: 'Forbidden'
      });
      break;
    default:
      message = formatMessage({
        id: 'csv-upload.Http.InternalServerError',
        defaultMessage: 'ServerError'
      });
      break
  }
  return <span style={{color: status >= 200 && status < 400 ? '#0e0' : '#e00'}}>{message}</span>
}

const Scroll = styled.div`
  overflow-x: scroll;
  max-width: 1000px;
`

export default function (props) {
  const {contentType, csvData, onClose, onRefresh} = props
  const {formatMessage} = useIntl();
  const [currentProgress, setCurrentProgress] = useState(ProgressType.Prepare)
  const [progresses, setProgresses] = useState([])
  const [showDialog, setDialog] = useState(false)
  const attributes = Object.entries(contentType.schema.attributes)
  const {displayName, draftAndPublish} = contentType.schema

  const onClickSave = useCallback(async () => {
    setCurrentProgress(ProgressType.Saving)
    setProgresses([])
    const works = []
    for (const params of csvData) {
      // attributes.forEach((attribute, i) => {
      //   if(line[i]){
      //     params[attribute[0]] = line[i]
      //   }
      // })
      console.log(params)
      const response = await saveRequest(contentType.uid, params)
      works.push(response.status)
      setProgresses(works.slice())
    }
    setCurrentProgress(ProgressType.Complete)
    setDialog(true)
  }, [csvData, progresses])
  const successCount = progresses.filter(progress => progress >= 200 && progress < 300).length
  const errorCount = progresses.length - successCount
  return (
    <>
      <ModalLayout onClose={() => onClose()} labelledBy="title">
        <ModalHeader>
          <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
            {displayName}
          </Typography>
        </ModalHeader>
        <ModalBody>
          <Scroll>
            <Table rowCount={1} colCount={attributes.length + 1}>
              <Thead>
                <Tr>
                  <Th>{''}</Th>
                  {
                    attributes.map((attribute, index) => (
                      <Th key={index}>
                        {attribute[0]}
                      </Th>
                    ))
                  }
                </Tr>
              </Thead>
              <Tbody>
                {
                  csvData.map((line, lineIndex) => (
                    <Tr key={lineIndex}>
                      <Td>
                        {
                          statusToMessage(progresses[lineIndex])
                        }
                        {
                          currentProgress === ProgressType.Prepare && <IconButton
                            icon={<Trash/>}
                            onClick={() => {
                              const newCSVData = csvData.filter((row, index) => index !== lineIndex)
                              onRefresh(newCSVData)
                            }}
                          />
                        }
                      </Td>
                      {
                        Object.values(line).map((cell, cellIndex) => <Td key={cellIndex}>{cell}</Td>)
                      }
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </Scroll>
        </ModalBody>
        <ModalFooter
          startActions={
            draftAndPublish && <Typography as={'h5'}>
              {formatMessage({
                id: 'csv-upload.Modal.DraftDescription',
                defaultMessage: 'Save this collection type as a draft'
              })}
            </Typography>
          }
          endActions={
            <>
              <Button
                style={{margin: '0 0 2px auto'}}
                disabled={csvData.length === 0 || currentProgress === ProgressType.Saving}
                loading={currentProgress === ProgressType.Saving}
                onClick={onClickSave}>{formatMessage({id: 'csv-upload.Modal.Save', defaultMessage: 'Save'})}</Button>
            </>
          }
        />
      </ModalLayout>
      <UploadViewDialog
        visible={showDialog}
        collectionTypeLink={`${process.env.ADMIN_PATH}content-manager/collectionType/${contentType.uid}`}
        successCount={successCount}
        errorCount={errorCount}
        onClose={() => setDialog(false)}
      />
    </>
  )
}
