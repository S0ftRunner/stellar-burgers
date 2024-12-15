import {
  getFeeds,
  initialState,
  feedsReducer,
  resetOrderModalData
} from '../src/services/slices/feedsSlice';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1,
  success: true,
  orderModalData: [
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
  
  ]
};

describe('Тестировани feedsReducer', () => {
  test('Начало запроса', () => {
    const state = feedsReducer(initialState, getFeeds.pending('pending'));
    expect(state.isLoading).toBeTruthy();
  });

  test('Результат запроса:', () => {
    const state = feedsReducer(
      initialState,
      getFeeds.fulfilled(feedsMockData, 'fulfilled')
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.feeds).toEqual(feedsMockData);
  });
});

describe('Работа модального окна', () => {
  test('Сброс модального окна', () => {
    const state = feedsReducer(
      initialState,
      getFeeds.fulfilled(feedsMockData, 'fulfilled')
    );

    const stateWithoutOrderModalData = feedsReducer(state, resetOrderModalData());

    expect(stateWithoutOrderModalData.orderModalData).toBeNull();
  });

});

