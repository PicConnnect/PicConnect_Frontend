import { createSlice } from '@reduxjs/toolkit';

const uploadSlice = createSlice({
    name: 'fileUploadProgress',
    initialState: {
      progress: 0,
      isUploading: false
    },
    reducers: {
      setFileUploadProgress: (state, action) => {
        state.progress = action.payload;
      },
      setIsUploading: (state, action) => {
        state.isUploading = action.payload;
      },
    },
});
  
export const { setFileUploadProgress, setIsUploading} = uploadSlice.actions;
export default uploadSlice.reducer;