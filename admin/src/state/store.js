import {configureStore} from '@reduxjs/toolkit';
import * as action from "./action";

export default configureStore({
  reducer: {
    context: action.contextData.reducer,
    editCell: action.editCellVisible.reducer,
    csvData: action.importCSVData.reducer,
    contentType: action.contentTypeData.reducer
  }
})
