import { loginUserApi, registerUserApi, resetPasswordApi, TLoginData, TRegisterData } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

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
  }
});


export const regiterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);

    const {user, refreshToken, accessToken} = response;

    console.log(refreshToken, accessToken);

    return user;
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);

    const {user, refreshToken, accessToken} = response;

    console.log(user, refreshToken, accessToken);
    return user;
  }
)

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: {password: string, token: string}) => {
    const response = await resetPasswordApi(data);

    const {success} = response;

    return success;
  }
)