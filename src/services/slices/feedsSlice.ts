import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { RootState } from '../store';

type TFeedsState = {
  feeds: TOrdersData;
  isLoading?: boolean;
  orderModalData?: TOrder | null;
};

export const initialState: TFeedsState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: true,
  orderModalData: null
};

export const getFeeds = createAsyncThunk(
  'feeds/get',
  async () => await getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    resetOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrder: (state) => state.feeds,
    getFeedsSelector: (state) => {
      return state.feeds.orders;
    },

    getTotalSelector: (state) => {
      return state.feeds.total;
    },

    getTotalTodaySelector: (state) => {
      return state.feeds.totalToday;
    },
    getOrderModalDataSelector: (state) => state.orderModalData,
    getIsLoadingOrderSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload;
        state.isLoading = false;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const getFeedByNumberSelector =
  (feedId?: string) => (state: RootState) => {
    for (let order of state.feeds.feeds.orders) {
      console.log(order);
    }
    return state.feeds.feeds.orders.find((order) => order._id === feedId);
  };

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrder',
  async (data: number, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    return response.orders[0];
  }
);
export const feedsReducer = feedsSlice.reducer;
export const {
  getFeedsSelector,
  getTotalTodaySelector,
  getTotalSelector,
  getOrderModalDataSelector,
  getIsLoadingOrderSelector
} = feedsSlice.selectors;
export const { resetOrderModalData } = feedsSlice.actions;
