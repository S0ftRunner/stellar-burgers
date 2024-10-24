import { orderBurgerApi, TNewOrderResponse } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TUserOrderData = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderResponse: TNewOrderResponse | null;
  orderRequest: boolean;
};

const initialState: TUserOrderData = {
  bun: null,
  ingredients: [],
  orderResponse: null,
  orderRequest: false,
};

const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },

    addBun: (state, action) => {
      state.bun = action.payload;
    },

    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },

    moveUpIngredient: (state, action: PayloadAction<{ index: number }>) => {
      const currentItem = state.ingredients[action.payload.index];

      state.ingredients[action.payload.index] =
        state.ingredients[action.payload.index - 1];

      state.ingredients[action.payload.index - 1] = currentItem;
    },

    moveDownIngredient: (state, action: PayloadAction<{ index: number }>) => {
      const currentItem = state.ingredients[action.payload.index];

      state.ingredients[action.payload.index] =
        state.ingredients[action.payload.index + 1];

      state.ingredients[action.payload.index + 1] = currentItem;
    },

    resetUserOrder: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderResponse = null;
    }
  },
  selectors: {
    getOrderState: (state) => state,
    getUserOrderBun: (state) => state.bun,
    getUserOrderIngredients: (state) => state.ingredients,

  },

  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.orderRequest = true;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.orderResponse = action.payload || null;
      state.orderRequest = false;

    })
  }
});

export const createOrder = createAsyncThunk(
  'userOrder/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);

    if (response.success) {
      return response;
    }
  }
);

export const userOrderReducer = userOrderSlice.reducer;

export const { getUserOrderBun, getUserOrderIngredients, getOrderState } =
  userOrderSlice.selectors;

export const {
  addIngredient,
  addBun,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetUserOrder
} = userOrderSlice.actions;
