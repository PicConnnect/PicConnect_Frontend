import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import postReducer from './redux/postSlice'
import uploadReducer from './redux/uploadSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    fileUploadProgress: uploadReducer
  },
});