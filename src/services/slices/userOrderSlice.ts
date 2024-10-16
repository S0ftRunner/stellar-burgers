import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TUserOrderData = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TUserOrderData = {
  bun: null,
  ingredients: [],
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
      console.log('удаление элемента');
      state.ingredients = state.ingredients.filter(ingredient => ingredient._id !== action.payload);
    }
  },
  selectors: {
    getUserOrderBun: (state) => state.bun,
    getUserOrderIngredients: (state) => state.ingredients
  }
});

export const userOrderReducer = userOrderSlice.reducer;

export const { getUserOrderBun, getUserOrderIngredients } =
  userOrderSlice.selectors;

export const { addIngredient, addBun, deleteIngredient } = userOrderSlice.actions;
