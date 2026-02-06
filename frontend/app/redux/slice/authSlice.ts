// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   apiLogin,
//   apiRegister,
//   apiGetProfile
// } from '../../services/authApi';

// export interface User {
//   id?: number | string;
//   email: string;
//   username?: string;
// }

// interface AuthState {
//   currentUser: User | null;
//   loading: boolean;
//   error: string | null;
//   isLoggedIn: boolean;
// }

// const initialState: AuthState = {
//   currentUser: null,
//   loading: false,
//   error: null,
//   isLoggedIn: false,
// };

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (user: any, {rejectWithValue }) => {
//     try {
//       return await apiLogin(user);
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (user: any, { rejectWithValue }) => {
//     try {
//       return await apiRegister(user);
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// export const fetchProfile = createAsyncThunk(
//   'auth/fetchProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       return await apiGetProfile();
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.currentUser = null;
//       state.isLoggedIn = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state,action:any) => {
//         state.loading = false;
//         state.currentUser = action.payload.user;
//         state.isLoggedIn = true;
//         state.error=null
//       })
//       .addCase(loginUser.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfile.fulfilled, (state, action: any) => {
//         state.loading = false;
//         state.error = null
//       })
//       .addCase(fetchProfile.rejected, (state,action:any) => {
//         state.loading = false;
//         state.currentUser = null;
//         state.isLoggedIn = false;
//         state.error = action.payload
//       })

//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(registerUser.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiLogin, apiRegister, apiGetProfile } from "../../services/authApi"

export interface User {
  id?: number | string
  email: string
  username?: string
}

interface AuthState {
  currentUser: User | null
  loading: boolean
  error: string | null
  isLoggedIn: boolean
  otp: string | null
  showCodeInput: boolean
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  otp: null,
  showCodeInput: false,
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiLogin(user)
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiRegister(user)
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await apiGetProfile()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null
      state.isLoggedIn = false
      state.error = null
      state.otp = null
      state.showCodeInput = false
    },
    setOtp: (state, action) => {
      state.otp = action.payload
    },
    setShowCodeInput: (state, action) => {
      state.showCodeInput = action.payload
    },
    clearOtpState: (state) => {
      state.otp = null
      state.showCodeInput = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.loading = false
        state.currentUser = action.payload?.user || action.payload
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action: any) => {
        state.loading = false
        state.currentUser = action.payload?.user || action.payload
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(fetchProfile.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, setOtp, setShowCodeInput, clearOtpState } =
  authSlice.actions

export default authSlice.reducer
