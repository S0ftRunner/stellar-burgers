import {
  userDataReducer,
  regiterUser,
  loginUser,
  resetPassword,
  updateUser,
  logoutUser,
  getUserData,
  getUserOrders,
  forgotPassword,
  initialState
} from '../src/services/slices/userDataSlice';

const mockUserData = {
  email: 'mockEmailVen@mail.ru',
  name: 'mockNameVen'
};

const mockRegisterData = {
  email: 'mockEmailVen@mail.ru',
  name: 'mockNameVen',
  password: 'mockPasswordVen12'
};

const mockLoginData = {
  email: 'mockEmailVen@mail.ru',
  password: 'mockPasswordVen12'
};

describe('Тестирование userData: ', () => {
  test('Ожидание регистрации пользователя', () => {
    const state = userDataReducer(
      initialState,
      regiterUser.pending('pending', mockRegisterData)
    );

    expect(state.isAuth).toBeFalsy();
  });

  test('Успешная регистрация пользователя: ', () => {
    const state = userDataReducer(
      initialState,
      regiterUser.fulfilled(mockUserData, 'fulfilled', mockRegisterData)
    );

    expect(state.isAuth).toBeTruthy();
    expect(state.data).toEqual(mockUserData);
  });
});
