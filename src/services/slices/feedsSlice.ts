import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { RootState } from '../store';

type TFeedsState = {
  feeds: TOrdersData;
};

const initialState: TFeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const getFeeds = createAsyncThunk('feeds/get', async () => {
  return getFeedsApi();
});

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => {
      return state.feeds.orders;
    },

    getTotalSelector: (state) => {
      return state.feeds.total;
    },

    getTotalTodaySelector: (state) => {
      return state.feeds.totalToday;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        console.log('запрос был отправлен');
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        console.log('запрос завершен успешно');
        state.feeds = action.payload;
      })
      .addCase(getFeeds.rejected, (state) => {
        console.log('запрос отклонен');
      });
  }
});

export const getFeedByNumberSelector = (feedId: number) => (state: RootState) => {
  return state.feeds.feeds.orders.filter((order) => order.number === feedId);
}

export const feedsReducer = feedsSlice.reducer;
export const { getFeedsSelector, getTotalTodaySelector, getTotalSelector } = feedsSlice.selectors;
