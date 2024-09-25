import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

type TIngredinetsState = {
  ingredients: TIngredient[];
}

let initialState: TIngredinetsState = {
  ingredients: [],
};

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  async () => {
    return getIngredientsApi();
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients', 
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getMainIngredientsSelector: (state) => {
      return state.ingredients.filter((element: TIngredient) => {
        if (element.type === 'main') {
          console.log(element.name);
          return element;
        }
      });
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
      })
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const {getIngredientsSelector, getMainIngredientsSelector} = ingredientsSlice.selectors;
