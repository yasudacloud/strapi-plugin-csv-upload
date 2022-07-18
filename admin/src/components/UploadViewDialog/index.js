import React from 'react';
import {useIntl} from 'react-intl';
import {Dialog, DialogBody, DialogFooter} from '@strapi/design-system/Dialog';
import {Table, Tbody, Tr, Td} from '@strapi/design-system/Table';
import {Button} from '@strapi/design-system/Button'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import styled from "styled-components";

const Link = styled.a`
  color: #4945ff;
  font-size: 15px;
  text-decoration: none;

  &:hover {
    color: #2723dd;
  }
`

export default function UploadViewDialog(props) {
  const {
    successCount,
    errorCount,
    collectionTypeLink,
    visible,
    onClose
  } = props
  const {formatMessage} = useIntl();
  return (
    <Dialog onClose={() => onClose()} isOpen={visible} title={formatMessage({
      id: 'csv-upload.Dialog.Title',
      defaultMessage: 'Saved'
    })}>
      <DialogBody>
        <Stack spacing={2}>
          <Table rowCount={2} colCount={2}>
            <Tbody>
              <Tr>
                <Td>Success</Td>
                <Td>{successCount}</Td>
              </Tr>
              <Tr>
                <Td>Error</Td>
                <Td>{errorCount}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex justifyContent="center" paddingTop={3}>
            <Link href={collectionTypeLink}>{
              formatMessage({
                id: 'csv-upload.Dialog.Link.ContentType',
                defaultMessage: 'Go to the Content Type'
              })
            }</Link>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter startAction={<Button onClick={() => onClose()} variant="tertiary">
        {
          formatMessage({
            id: 'csv-upload.Dialog.Close',
            defaultMessage: 'Close'
          })
        }
      </Button>}
      />
    </Dialog>
  )
}
