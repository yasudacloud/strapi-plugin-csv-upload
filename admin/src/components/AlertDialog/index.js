import React, {useCallback} from 'react'
import {Dialog, DialogBody, DialogFooter} from '@strapi/design-system/Dialog';
import {Stack} from '@strapi/design-system/Stack'
import {Flex} from '@strapi/design-system/Flex'
import {Button} from '@strapi/design-system/Button'
import {Typography} from '@strapi/design-system/Typography'
import {useDispatch, useSelector} from "react-redux";
import {onContextErrorClose} from "../../state/action";

export default function AlertDialog() {
  const dispatch = useDispatch()
  const context = useSelector((state) => state.context);
  const onClose = useCallback(() => {
    dispatch(onContextErrorClose())
  }, [])
  return (
    <Dialog onClose={() => onClose} title="Error" isOpen={context.alert.visible}>
      <DialogBody icon={<></>}>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">{context.alert.message}</Typography>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter startAction={<Button onClick={onClose} variant="tertiary">
        OK
      </Button>}/>
    </Dialog>
  )
}
