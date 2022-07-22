import {createSlice} from "@reduxjs/toolkit";

export const contentTypeData = createSlice({
  name: 'contentTypes',
  initialState: {
    active: '',
    data: []
  },
  reducers: {
    onChangeActive: (state,payloadAction) => {
      state.active = payloadAction.payload
    },
    onChangeContentTypes: (state, payloadAction) => {
      state.data = payloadAction.payload
    }
  }
})

export const onChangeContentTypes = contentTypeData.actions.onChangeContentTypes
export const onActiveContentType = contentTypeData.actions.onChangeActive

export const importCSVData = createSlice({
  name: 'csvData',
  initialState: {
    data: []
  },
  reducers: {
    onChangeData: (state, payloadAction) => {
      state.data = payloadAction.payload
      return state
    }
  }
})

export const onChangeCSVData = importCSVData.actions.onChangeData

export const editCellVisible = createSlice(
  {
    name: 'editCell',
    initialState: {
      visible: false,
      editValues: {}
    },
    reducers: {
      onChangeVisible: (state) => {
        state.visible = !state.visible
      },
      onChangeEditValue: (state) => {
      }
    }
  }
)

export const onChangeEditVisible = editCellVisible.actions.onChangeVisible

export default {
  csvDataReducer: importCSVData.reducer,
  editCellReducer: editCellVisible.reducer,
  contentTypeReducer: contentTypeData.reducer
}

