import {createSlice} from "@reduxjs/toolkit";

export const contextData = createSlice({
  name: 'context',
  initialState: {
    alert: {
      visible: false,
      message: ''
    }
  },
  reducers: {
    onError: (state, payloadAction) => {
      state.alert = {
        visible: true,
        message: payloadAction.payload.message
      }
    },
    onErrorClose: (state, payloadAction) => {
      state.alert = {
        visible: false,
        message: ''
      }
    }
  }
})

export const onContextError = contextData.actions.onError
export const onContextErrorClose = contextData.actions.onErrorClose

export const contentTypeData = createSlice({
  name: 'contentTypes',
  initialState: {
    active: '',
    data: [],
  },
  reducers: {
    onChangeActive: (state, payloadAction) => {
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
    },
    onEditValue: (state, payloadAction) => {
      const {index, name, value} = payloadAction.payload
      if (index < state.data.length) {
        state.data[index][name] = value
      }
      return state
    }
  }
})

export const onChangeCSVData = importCSVData.actions.onChangeData
export const onEditCSVCell = importCSVData.actions.onEditValue

export const editCellVisible = createSlice(
  {
    name: 'editCell',
    initialState: {
      visible: false,
      editValues: {}
    },
    reducers: {
      onChangeEditValue: (state, payloadAction) => {
        state = payloadAction.payload
        return state
      }
    }
  }
)

export const onChangeEditValue = editCellVisible.actions.onChangeEditValue

export default {
  contextReducer: contextData.reducer,
  csvDataReducer: importCSVData.reducer,
  editCellReducer: editCellVisible.reducer,
  contentTypeReducer: contentTypeData.reducer,
}
