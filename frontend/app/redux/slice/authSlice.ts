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
//   otp:string | null
//   loading: boolean;
//   error: string | null;
//   isLoggedIn: boolean;
//   sessionid?:string |null
// }

// const initialState: AuthState = {
//   currentUser: null,
//   sessionid:null,
//   otp:null,
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
//       state.sessionid = null
//     },
//     handleseesionId:(state,action)=>{
//       state.sessionid = action.payload
//     },
//     handleseesionIdNull:(state,)=>{
//       state.sessionid = null
//     }
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
//         state.sessionid = null;
//         state.otp = null;
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

// export const { logout ,handleseesionId,handleseesionIdNull} = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiLogin, apiRegister, apiGetProfile } from '../../services/authApi'

export interface User {
  id?: number | string
  email: string
  username?: string
}

interface AuthState {
  currentUser: User | null
  otp: string | null
  loading: boolean
  error: string | null
  isLoggedIn: boolean
  sessionid: string | null
}

const initialState: AuthState = {
  currentUser: null,
  sessionid: typeof window !== 'undefined' ? localStorage.getItem('sessionid') : null,
  otp: typeof window !== 'undefined' ? localStorage.getItem('otp') : null,
  loading: false,
  error: null,
  isLoggedIn: false,
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiLogin(user)
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiRegister(user)
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await apiGetProfile()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null
      state.isLoggedIn = false
      state.error = null
      state.sessionid = null
      state.otp = null
      localStorage.removeItem('sessionid')
      localStorage.removeItem('otp')
    },

    handleseesionId: (state, action) => {
      state.sessionid = action.payload
      localStorage.setItem('sessionid', action.payload)
    },

    handleseesionIdNull: (state) => {
      state.sessionid = null
      localStorage.removeItem('sessionid')
    },

    handleOtp: (state, action) => {
      state.otp = action.payload
      localStorage.setItem('otp', action.payload)
    },

    handleOtpNull: (state) => {
      state.otp = null
      localStorage.removeItem('otp')
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
        state.currentUser = action.payload.user
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
        state.error = null
        state.currentUser = action.payload.user
        state.isLoggedIn = true
      })
      .addCase(fetchProfile.rejected, (state, action: any) => {
        state.loading = false
        state.currentUser = null
        state.sessionid = null
        state.otp = null
        state.isLoggedIn = false
        state.error = action.payload
        localStorage.removeItem('sessionid')
        localStorage.removeItem('otp')
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

export const {
  logout,
  handleseesionId,
  handleseesionIdNull,
  handleOtp,
  handleOtpNull
} = authSlice.actions

export default authSlice.reducer

