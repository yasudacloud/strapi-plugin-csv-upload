import {createSlice} from "@reduxjs/toolkit";

export const contentTypeData = createSlice({
  name: 'contentTypes',
  initialState: {
    active: '',
    data: []
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
      for (let i = 0; i < state.data.length; i++) {
        if (i === index) {
          state.data[i][name] = value
          break;
        }
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

// export const onChangeEditVisible = editCellVisible.actions.onChangeVisible
export const onChangeEditValue = editCellVisible.actions.onChangeEditValue

export default {
  csvDataReducer: importCSVData.reducer,
  editCellReducer: editCellVisible.reducer,
  contentTypeReducer: contentTypeData.reducer
}

