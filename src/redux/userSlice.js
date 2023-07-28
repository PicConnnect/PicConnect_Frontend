import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase";

export const updateUserNameInBackend = createAsyncThunk(
  "user/updateUserNameInBackend",
  async (payload, { rejectWithValue }) => {
    try {
      const { userId, newName } = payload;
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }), // Specify the attribute you want to update
        }
      );

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => { 
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`);
      console.log(response);
      if (!response.ok) {
        throw new Error('Server Error');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
    status: "idle",
    error: null,
    items: ["Name", "2023-01-01", "mail@gmail.com", "123-456-7890"],
  },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserNameInBackend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserNameInBackend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value.displayName = action.payload.name;
      })
      .addCase(updateUserNameInBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
    // .addCase(fetchUser.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.value = action.payload;
    // })
    // .addCase(fetchUser.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.payload;
    // })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.value = action.payload;
      state.items[0] = action.payload.name;
      state.items[2] = action.payload.email;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
