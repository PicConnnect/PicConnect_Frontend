import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous fetch posts function
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get("http://localhost:8000/api/photos");
  return response.data;
});

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, userId }) => {
    const response = await axios.post(
      `http://localhost:8000/api/photos/${postId}/like`,
      { userId }
    );
    // Consider returning the response data instead of postId
    return response.data;
  }
);

// Action to handle unliking a post
// Updated unlikePost action
export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async ({ postId, userId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/photos/${postId}/unlike`,
      { data: { userId } }
    );
    return response.data;
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    likedPhotoIds: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        //maybe increase the like count
        state.likedPhotoIds.push(action.payload);
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.likedPhotoIds = state.likedPhotoIds.filter(
          (id) => id !== action.payload
        );
      })
  },
});

export default postSlice.reducer;
