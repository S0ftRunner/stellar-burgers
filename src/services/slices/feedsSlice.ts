import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedsState = {
  feeds: TOrder[];
};

const initialState: TFeedsState = {
  feeds: []
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
      return state.feeds;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        console.log('запрос был отправлен');
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        console.log('запрос завершен успешно');
        state.feeds = action.payload.orders;
        console.log(state.feeds);
      })
      .addCase(getFeeds.rejected, (state) => {
        console.log('запрос отклонен');
      })
  }
});

export const feedsReducer = feedsSlice.reducer;
export const {getFeedsSelector} = feedsSlice.selectors;
