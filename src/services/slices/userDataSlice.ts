import { getUserApi, loginUserApi, logoutApi, registerUserApi, resetPasswordApi, TLoginData, TRegisterData, updateUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { removeUserTokens, setUserTokens } from '../../utils/auth';

type TUserData = {
  isAuth: boolean;
  isAuthChecked: boolean;
  data: TUser;
};

const initialState: TUserData = {
  isAuth: false,
  isAuthChecked: false,
  data: {
    name: '',
    email: ''
  }
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
      .addCase(regiterUser.pending, (state) => {
        console.log('register pending');
      })
      .addCase(regiterUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(regiterUser.rejected, (state, action) => {
        console.log(action.error);
      })
  }
});


export const regiterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);

    const {user, refreshToken, accessToken} = response;

    setUserTokens(refreshToken, accessToken);

    return user;
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);

    const {user, refreshToken, accessToken} = response;

    setUserTokens(refreshToken, accessToken);
    return user;
  }
)

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: {password: string, token: string}) => {
    const response = await resetPasswordApi(data);

    const {success} = response;

    return success;
  }
)

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);

    const {user} = response;

    return user;
  }
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    const response = await logoutApi();

    if (response.success) removeUserTokens();
  }
)

export const getUserData = createAsyncThunk(
  'user/getData',
  async () => {
    const response = await getUserApi();

    if (response.success) {
      return response.user;
    }


  }
)


export const userDataReducer = userDataSlice.reducer;
export const {getUserDataSelector} = userDataSlice.selectors;