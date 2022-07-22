import React from 'react'
import {Dialog, DialogBody, DialogFooter} from '@strapi/design-system/Dialog';
import Pencil from '@strapi/icons/Pencil'
import {Typography} from '@strapi/design-system/Typography'
import {Button} from '@strapi/design-system/Button'
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'

export default function EditCellDialog(props) {
  const {visible, onCancel, onComplete} = props
  if (!visible) {
    return null
  }

  return (
    <Dialog onClose={() => {
    }} title="Confirmation" isOpen={visible}>
      <DialogBody icon={<Pencil/>}>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter startAction={<Button onClick={() => onCancel()} variant="tertiary">
        Cancel
      </Button>} endAction={<Button variant="secondary" onClick={() => {
        onComplete()
      }}>
        Confirm
      </Button>}/>
    </Dialog>
  )
}
