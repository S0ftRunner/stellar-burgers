import {
  userDataReducer,
  regiterUser,
  loginUser,
  updateUser,
  logoutUser,
  getUserData,
  getUserOrders,
  initialState
} from '../src/services/slices/userDataSlice';

const mockUserOrders = [{
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093c'
  ],
  _id: '6622337897ede0001d0666b5',
  status: 'done',
  name: 'TEST_NAME',
  createdAt: '2024-10-19T09:10:21.123Z',
  updatedAt: '2024-10-19T09:10:24.123Z',
  number: 43223
}];

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
  });
});

describe('Тестирование выхода пользователя: ', () => {
  test('Результат успешного выхода: ', () => {
    const expectResult = {
      name: '',
      email: ''
    };

    const state = userDataReducer(
      initialState,
      logoutUser.fulfilled(undefined, 'fulfilled')
    );

    expect(state.isAuth).toBeFalsy();
    expect(state.data).toEqual(expectResult);
  });
});

describe('Проверка авторизации пользователя: ', () => {
  test('Успешная авторизация пользователя: ', () => {
    const state = userDataReducer(
      initialState,
      getUserData.fulfilled(mockUserData, 'fulfilled')
    );

    expect(state.data).toEqual(mockUserData);
    expect(state.isAuthChecked).toBeTruthy();
    expect(state.isAuth).toBeTruthy();
  });

  test('Ошибка авторизации пользователя: ', () => {
    const error = 'auth.rejected';

    const state = userDataReducer(
      initialState,
      getUserData.rejected(new Error(error), 'rejected')
    );

    expect(state.isAuth).toBeFalsy();
    expect(state.isAuthChecked).toBeTruthy();
  });
});

describe('Получение заказов пользователя: ', () => {
  test('Пользователь получил свои заказы: ', () => {
    const state = userDataReducer(
      initialState,
      getUserOrders.fulfilled(mockUserOrders, 'fulfilled')
    );

    expect(state.userOrders).toEqual(mockUserOrders);
  });
});

describe('Проверка обновления данных пользователя: ', () => {
  test('Результат успешного обновления: ', () => {
 
    const state = userDataReducer(
      initialState, 
      updateUser.fulfilled(mockUserData, 'fulfilled', mockUserData)
    );

    expect(state.data).toEqual(mockUserData);
  })
})