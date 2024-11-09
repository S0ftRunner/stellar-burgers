import {
  getFeeds,
  initialState,
  feedsReducer
} from '../src/services/slices/feedsSlice';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1,
  success: true,
};

describe('Тестировани feedsReducer', () => {
  test('Запрос к серверу', () => {
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
