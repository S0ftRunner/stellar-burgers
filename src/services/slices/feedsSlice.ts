import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { RootState } from '../store';

type TFeedsState = {
  feeds: TOrdersData;
  isLoading: boolean;
};

const initialState: TFeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: true,
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
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        console.log('запрос завершен успешно');
        state.feeds = action.payload;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state) => {
        console.log('запрос отклонен');
        state.isLoading = false;
      });
  }
});

export const getFeedByNumberSelector = (feedId?: string) => (state: RootState) => {
  return state.feeds.feeds.orders.find((order) => order._id === feedId);
}

export const feedsReducer = feedsSlice.reducer;
export const { getFeedsSelector, getTotalTodaySelector, getTotalSelector } = feedsSlice.selectors;
