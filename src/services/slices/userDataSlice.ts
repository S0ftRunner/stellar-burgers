import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { removeUserTokens, setUserTokens } from '../../utils/auth';

type TUserData = {
  isAuth: boolean;
  isAuthChecked: boolean;
  data: TUser;
  userOrders: TOrder[];
  isLoadingUserOrder: boolean;
  registerError?: SerializedError;
  loginError?: SerializedError;
};

export const initialState: TUserData = {
  isAuth: false,
  isAuthChecked: false,
  data: {
    name: '',
    email: ''
  },
  userOrders: [],
  isLoadingUserOrder: false,
  loginError: undefined,
  registerError: undefined
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  selectors: {
    getUserDataSelector: (state) => state
  },

  extraReducers: (builder) => {
    builder
      .addCase(regiterUser.pending, (state) => {})
      .addCase(regiterUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(regiterUser.rejected, (state, action) => {
        state.registerError = action.error;
      })
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error;
      })
      .addCase(getUserData.pending, (state) => {
        console.log('userData pending');
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload || (state.data = { name: '', email: '' });
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        console.log(`rejected get user data: ${action.error}`);
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.pending, (state) => {
        console.log('logout pending');
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log('logout user');
        state.data = {
          name: '',
          email: ''
        };
        state.isAuth = false;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log(`logout rejected: ${action.error}`);
      })
      .addCase(updateUser.pending, (state) => {
        console.log('updating user');
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getUserOrders.pending, (state) => {
        console.log('getting user orders');
        state.isLoadingUserOrder = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        console.log('succesfully get user orders');
        state.isLoadingUserOrder = false;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        console.log(`getUserOrders rejected: ${action.error}`);
        state.isLoadingUserOrder = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        console.log('pending forgotPassword');
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        console.log('send new pass to your email');
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        console.log(action.error);
      });
  }
});

export const regiterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);

    const { user, refreshToken, accessToken } = response;

    setUserTokens(refreshToken, accessToken);

    return user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);

    const { user, refreshToken, accessToken } = response;

    setUserTokens(refreshToken, accessToken);
    return user;
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => {
    const response = await resetPasswordApi(data);

    const { success } = response;

    return success;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);

    const { user } = response;

    return user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();

  if (response.success) removeUserTokens();
});

export const getUserData = createAsyncThunk('user/getData', async () => {
  const response = await getUserApi();

  if (response.success) {
    return response.user;
  }
});

export const getUserOrders = createAsyncThunk('user/getOrders', async () => {
  const response = await getOrdersApi();

  return response;
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: { email: string }) => {
    const response = await forgotPasswordApi(email);

    return response.success;
  }
);
export const userDataReducer = userDataSlice.reducer;
export const { getUserDataSelector } = userDataSlice.selectors;
