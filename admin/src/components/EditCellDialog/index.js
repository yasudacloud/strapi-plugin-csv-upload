import React from 'react'
import {Dialog, DialogBody, DialogFooter} from '@strapi/design-system/Dialog';
import {useDispatch, useSelector} from "react-redux";
import DateTimeEditor from "./DateTimeEditor";
import {onEditCSVCell} from "../../state/action";
import DateEditor from "./DateEditor";
import UnSupportType from "./UnSupportType";
import SecureTextEditor from "./SecureTextEditor";
import EmailEditor from "./EmailEditor";
import StringEditor from "./StringEditor";
import BooleanEditor from "./BooleanEditor";
import TimeEditor from "./TimeEditor";

const getEditorComponent = (type) => {
  switch (type) {
    case 'datetime':
      return DateTimeEditor
    case 'date':
      return DateEditor
    case 'time':
      return TimeEditor
    case 'password':
      return SecureTextEditor
    case 'boolean':
      return BooleanEditor
    case 'string':
      StringEditor.defaultProps = {
        multiline: false
      }
      return StringEditor
    case 'text':
      StringEditor.defaultProps = {
        multiline: true
      }
      return StringEditor
    case 'email':
      return EmailEditor
    default:
      return null
  }
}

export default function EditCellDialog(props) {
  const {visible, onDone} = props
  if (!visible) {
    return null
  }
  const dispatch = useDispatch()
  const editCell = useSelector((state) => state.editCell);
  const {type} = editCell.editValues.attribute
  const EditorComponent = getEditorComponent(type)
  const onEditCallback = (value) => {
    dispatch(onEditCSVCell({
      index: editCell.editValues.lineIndex,
      name: editCell.editValues.contentTypeName,
      value
    }))
    onDone()
  }

  return (
    <Dialog onClose={onDone} title="Edit" isOpen={visible}>
      <DialogBody>
        {
          EditorComponent ? (
            <EditorComponent
              meta={editCell.editValues}
              onCancel={onDone}
              onComplete={onEditCallback}
            />
          ) : (
            <UnSupportType onClose={onDone} type={type}/>
          )
        }
      </DialogBody>
    </Dialog>
  )
}
