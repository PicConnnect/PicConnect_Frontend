import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase/firebase";
import axios from "axios";

export const updateUserNameInBackend = createAsyncThunk(
  "user/updateUserNameInBackend",
  async (payload, { rejectWithValue }) => {
    try {

      const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/${payload.id}`, payload)
  
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
      console.log("fetching user....")
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error('User ID not found');
      }
      
      const {data} = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`);
   
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOtherUser = createAsyncThunk(
  'user/fetchOtherUser', 
  async(userId, { rejectWithValue }) => {
    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  } 
)

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
        state.value = action.payload;
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
      console.log("Fulfilled: ", action.payload)
      state.status = 'succeeded';
      state.value = action.payload;
      state.items[0] = action.payload.name;
      state.items[1] = action.payload.birthday;
      state.items[2] = action.payload.email;
      state.items[3] = action.payload.phoneNumber;

      state.items.forEach((data) => console.log(data))
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })

    .addCase(fetchOtherUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.value = action.payload;
      // state.items[0] = action.payload.name;
      // state.items[2] = action.payload.email;
    })
    .addCase(fetchOtherUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
