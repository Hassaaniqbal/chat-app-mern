// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New login thunk
// New login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          username,
          password,
        },
        {
          withCredentials: true, // To handle cookies
        }
      );

      return response.data;  // Return the actual response data
    } catch (error) {
      // Check if error.response is defined
      if (error.response && error.response.data) {
        // Return the error response from the server
        return rejectWithValue(error.response.data);
      } else {
        // Handle cases where there is no error.response (like network issues)
        return rejectWithValue({ message: 'Network error or server is down' });
      }
    }
  }
);


// Logout user async action
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Call backend to clear the token from the cookie
      const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//verify auth
export const verifyAuth = createAsyncThunk(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/verify', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false, // New field for authentication status
    isVerifying: true, // New field to track verification status
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // New reducer for logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'An unknown error occurred' };
      })


      // New cases for login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'An unknown error occurred' };
        state.isAuthenticated = false;
      })


      //new case for logout 
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'An unknown error occurred' };
      })

      .addCase(verifyAuth.pending, (state) => {
        state.isVerifying = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isVerifying = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.isVerifying = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      
      ;
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;