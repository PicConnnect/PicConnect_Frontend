import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserNameInBackend = createAsyncThunk(
  "user/updateUserNameInBackend",
  async (payload, { rejectWithValue }) => {
    try {
      const { userId, newName } = payload;
      const response = await fetch(
        `http://localhost:8000/api/users/${userId}`,
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

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`);
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
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
