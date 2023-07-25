import { createSlice } from '@reduxjs/toolkit';

const uploadSlice = createSlice({
    name: 'fileUploadProgress',
    initialState: {
      progress: 0,
      isUploading: false,
      uploadStatus: ''
    },
    reducers: {
      setFileUploadProgress: (state, action) => {
        state.progress = action.payload;
      },
      setIsUploading: (state, action) => {
        state.isUploading = action.payload;
      },
      setUploadStatus: (state, action) => {
        state.uploadStatus = action.payload;
      },
    },
});
  
export const { setFileUploadProgress, setIsUploading, setUploadStatus} = uploadSlice.actions;
export default uploadSlice.reducer;