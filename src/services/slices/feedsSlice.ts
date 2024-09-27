import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

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

    getTotal: (state) => {
      return state.feeds.total;
    },

    getTotalToday: (state) => {
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
        state.feeds.orders = action.payload.orders;
        console.log(state.feeds);
      })
      .addCase(getFeeds.rejected, (state) => {
        console.log('запрос отклонен');
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
export const { getFeedsSelector } = feedsSlice.selectors;
