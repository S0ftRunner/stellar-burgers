import {
  getFeeds,
  initialState,
  feedsReducer,
  resetOrderModalData,
  getOrderByNumber
} from '../src/services/slices/feedsSlice';

const mockOrdersData = {
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
};

const feedsMockData = {
  feeds: {
    orders: [mockOrdersData],
    total: 1,
    totalToday: 1
  },
  success: true,
  orderModalData: [mockOrdersData]
};

const mockFeedRequestData = {
  orders: feedsMockData.feeds.orders,
  total: feedsMockData.feeds.total,
  totalToday: feedsMockData.feeds.totalToday,
  success: true
};

// ТЕСТИРОВАНИЕ ACTIONS/REDUCERS

describe('Тестирование feedsReducer', () => {
  test('Начало запроса', () => {
    const state = feedsReducer(initialState, getFeeds.pending('pending'));
    expect(state.isLoading).toBeTruthy();
  });

  test('Результат запроса:', () => {
    const state = feedsReducer(
      initialState,
      getFeeds.fulfilled(
        {
          orders: feedsMockData.feeds.orders,
          total: feedsMockData.feeds.total,
          totalToday: feedsMockData.feeds.totalToday,
          success: true
        },
        'fulfilled'
      )
    );
    expect(state.isLoading).toBeFalsy();
    expect(state.feeds.total).toEqual(feedsMockData.feeds.total);
    expect(state.feeds.totalToday).toEqual(feedsMockData.feeds.totalToday);
    expect(state.feeds.orders).toEqual(feedsMockData.feeds.orders);
  });
});

describe('Работа модального окна', () => {
  test('Сброс модального окна', () => {
    const state = feedsReducer(
      initialState,
      getFeeds.fulfilled(mockFeedRequestData, 'fulfilled')
    );

    const stateWithoutOrderModalData = feedsReducer(
      state,
      resetOrderModalData()
    );

    // все осталось как прежде, кроме состояния модального окна
    expect(stateWithoutOrderModalData.orderModalData).toBeNull();
    expect(stateWithoutOrderModalData.feeds.total).toBe(state.feeds.total);
    expect(stateWithoutOrderModalData.feeds.totalToday).toBe(
      state.feeds.totalToday
    );
    expect(stateWithoutOrderModalData.feeds.orders).toBe(state.feeds.orders);
  });
});

describe('Работа асинхронных экшенов', () => {
  test('Начало запроса getOrderByNumber: ', () => {
    const state = feedsReducer(
      initialState,
      getOrderByNumber.pending('pending', feedsMockData.feeds.orders[0].number)
    );

    expect(state.isLoading).toBeTruthy();
  });

  test('Результат запроса getOrderByNumber: ', () => {
    const state = feedsReducer(
      initialState,
      getOrderByNumber.fulfilled(
        feedsMockData.feeds.orders[0],
        'fulfilled',
        feedsMockData.feeds.orders[0].number
      )
    );

    expect(state.isLoading).toBeFalsy();
    expect(state.orderModalData).toEqual(feedsMockData.feeds.orders[0]);
  });
});
