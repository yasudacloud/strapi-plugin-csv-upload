import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import styled from 'styled-components'
import {Table, Thead, Tbody, Tr, Td, Th} from '@strapi/design-system/Table';
import {Button} from '@strapi/design-system/Button'
import {IconButton} from '@strapi/design-system/IconButton';
import Trash from '@strapi/icons/Trash'
import {saveRequest} from '../../utils/http'
import UploadViewDialog from "../UploadViewDialog";
import {AttributeCell} from "./AttributeCell";
import EditCellDialog from "../EditCellDialog";
import {useDispatch, useSelector} from "react-redux";
import {onChangeEditValue} from "../../state/action";

/**
 * @type {{Complete: number, Prepare: number, Saving: number}}
 */
const ProgressType = {
  Prepare: 1,
  Saving: 2,
  Complete: 3
}

/**
 * Save Response Message
 * @param status
 * @returns {JSX.Element|null}
 */
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
  return <span style={{color: status >= 200 && status < 400 ? '#0a0' : '#e00'}}>{message}</span>
}

const Scroll = styled.div`
  overflow-x: scroll;
  max-width: 100%;
  display: grid;
`

const EditableCell = styled(Td)`
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: #eee;
  }
`

export default function (props) {
  const dispatch = useDispatch()
  const csv = useSelector((state) => state.csvData);
  const {contentType, onRefresh} = props
  const {formatMessage} = useIntl();
  const [currentProgress, setCurrentProgress] = useState(ProgressType.Prepare)
  const [progresses, setProgresses] = useState([])
  const [showResultDialog, setResultDialog] = useState(false)

  const editCell = useSelector((state) => state.editCell);
  const attributes = Object.entries(contentType.schema.attributes)

  const onClickSave = async () => {
    setCurrentProgress(ProgressType.Saving)
    setProgresses([])
    const works = []
    for (const params of csv.data) {
      const response = await saveRequest(contentType.uid, params)
      works.push(response.status)
      setProgresses(works.slice())
    }
    setCurrentProgress(ProgressType.Complete)
    setResultDialog(true)
  }

  const onClickEditCell = (value, attribute, lineIndex, contentTypeName) => {
    dispatch(onChangeEditValue({
      visible: true,
      editValues: {
        value,
        attribute,
        lineIndex,
        contentTypeName
      }
    }))
  }

  const successCount = progresses.filter(progress => progress >= 200 && progress < 300).length
  const errorCount = progresses.length - successCount
  const initialValues = {}
  attributes.forEach(attribute => {
    initialValues[attribute[0]] = undefined
  })
  return (
    <>
      <Button
        style={{margin: '10px 0 10px auto'}}
        disabled={csv.data.length === 0 || currentProgress === ProgressType.Saving}
        loading={currentProgress === ProgressType.Saving}
        onClick={onClickSave}>{formatMessage({id: 'csv-upload.ContentType.Save', defaultMessage: 'Save'})}</Button>

      <Scroll>
        <Table rowCount={1} colCount={attributes.length + 2}>
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
              csv.data.map((line, lineIndex) => (
                <Tr key={lineIndex}>
                  <Td>
                    {
                      statusToMessage(progresses[lineIndex])
                    }
                  </Td>
                  {
                    Object.values(Object.assign({}, initialValues, line)).map((cell, cellIndex) => {
                      const attribute = (attributes[cellIndex] && attributes[cellIndex].length > 1) ? attributes[cellIndex][1] : {}
                      return (
                        <EditableCell key={cellIndex}
                                      onClick={() => onClickEditCell(cell, attribute, lineIndex, attributes[cellIndex][0])}>
                          <AttributeCell
                            value={cell}
                            attribute={attribute}
                          >{cell}</AttributeCell>
                        </EditableCell>
                      )
                    })
                  }

                  <Td>
                    {
                      currentProgress === ProgressType.Prepare && <IconButton
                        noBorder={true}
                        icon={<Trash/>}
                        onClick={() => {
                          const newCSVData = csv.data.filter((row, index) => index !== lineIndex)
                          onRefresh(newCSVData)
                        }}
                      />
                    }
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </Scroll>

      <UploadViewDialog
        visible={showResultDialog}
        collectionTypeLink={`${process.env.ADMIN_PATH}content-manager/collectionType/${contentType.uid}`}
        successCount={successCount}
        errorCount={errorCount}
        onClose={() => setResultDialog(false)}
      />
      <EditCellDialog
        visible={editCell.visible}
        onDone={() => dispatch(onChangeEditValue({visible: false}))}
      />
    </>
  )
}
