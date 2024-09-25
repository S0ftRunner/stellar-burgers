import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredinetsState = {
  ingredients: TIngredient[];
};

const initialState: TIngredinetsState = {
  ingredients: []
};

export const getIngredients = createAsyncThunk('ingredients/get', async () => {
  return getIngredientsApi();
});

function getIngredientsByType(state: TIngredinetsState, type: string) {
  return state.ingredients.filter((element: TIngredient) => {
    if (element.type === type) {
      return element;
    }
  });
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getBunsIngredientsSelector: (state) => {
      return getIngredientsByType(state, 'bun');
    },
    getMainIngredientsSelector: (state) => {
      return getIngredientsByType(state, 'main');
    },
    getSaucesIngredientsSelector: (state) => {
      return getIngredientsByType(state, 'sauce');
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        console.log('ожидаю ингредиенты');
      })
      .addCase(getIngredients.rejected, (state) => {
        console.log('Произошла ошибка в запросе');
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        console.log('Ингредиенты получены');
        state.ingredients = action.payload;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const {
  getIngredientsSelector,
  getMainIngredientsSelector,
  getBunsIngredientsSelector,
  getSaucesIngredientsSelector
} = ingredientsSlice.selectors;
