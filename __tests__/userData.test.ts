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

describe('Тестирование регистрации пользователя: ', () => {
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
    expect(state.registerError).toBeUndefined();
  });

  test('Регистрация прошла неуспешно:', () => {
    const error = 'register.rejected';
    const state = userDataReducer(
      initialState,
      regiterUser.rejected(new Error(error), 'rejected', mockRegisterData)
    );

    expect(state.registerError?.message).toEqual(error);
  });
});

describe('Тестирование логирования пользователя: ', () => {
  test('Ожидание логирования пользователя', () => {
    const state = userDataReducer(
      initialState,
      loginUser.pending('pending', mockLoginData)
    );

    expect(state.loginError).toBeUndefined();
  });

  test('Успешное логирование пользователя: ', () => {
    const state = userDataReducer(
      initialState,
      loginUser.fulfilled(mockUserData, 'fulfilled', mockLoginData)
    );

    expect(state.data).toEqual(mockUserData);
    expect(state.loginError).toBeUndefined();
    expect(state.isAuth).toBeTruthy();
  });

  test('Логирование пользвателя прошло неуспешно: ', () => {
    const error = 'login.rejected';

    const state = userDataReducer(
      initialState, 
      loginUser.rejected(new Error(error), 'rejected', mockLoginData)
    );

    expect(state.loginError?.message).toEqual(error);
  })
});
