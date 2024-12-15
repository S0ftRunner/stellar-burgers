import {
  feedsReducer,
  getFeeds,
  resetOrderModalData
} from '../src/services/slices/feedsSlice';
import {
  userOrderReducer,
  createOrder,
  initialState
} from '../src/services/slices/userOrderSlice';

const orderMockData = [
  {
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
  }
];

describe('Создание заказа пользователем', () => {
  test('Начало запроса', () => {
    const state = userOrderReducer(
      initialState,
      createOrder.pending('pending', orderMockData[0].ingredients)
    );
    expect(state.orderRequest).toBeTruthy();
  });

  test('Результат запроса', () => {
    const state = userOrderReducer(
      initialState,
      createOrder.fulfilled(
        { order: orderMockData[0], name: 'TEST', success: true },
        'fulfilled',
        orderMockData[0].ingredients
      )
    );

    expect(state.orderRequest).toBeFalsy();

    // ождаем получение положительного ответа от созданного заказа
    expect(state.orderResponse).toBeTruthy();
  });
});
