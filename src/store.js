import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import postReducer from './redux/postSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});