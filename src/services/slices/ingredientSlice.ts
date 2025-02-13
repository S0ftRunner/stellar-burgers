import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

type TIngredinetsState = {
  ingredients: TIngredient[];
  isLoadingIngredients: boolean;
};

export const initialState: TIngredinetsState = {
  ingredients: [],
  isLoadingIngredients: false,
};

export const getIngredients = createAsyncThunk('ingredients/get', async () => {
  return getIngredientsApi();
});

function getIngredientsByType(
  state: TIngredinetsState,
  type: string
): TIngredient[] {
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
    getIngredientByIdSelector: (state, ingredientId: string) => {
      return state.ingredients.filter(ingredient => ingredient._id === ingredientId);
   },
    getIngredientsSelector: (state) => state.ingredients,
    getBunsIngredientsSelector: (state) => {
      return getIngredientsByType(state, 'bun');
    },
    getMainIngredientsSelector: (state) => {
      return getIngredientsByType(state, 'main');
    },
    getSaucesIngredientsSelector: (state) => {
      return getIngredientsByType(state, 'sauce');
    },
    getIsLoadingIngredientsSelector: (state) => state.isLoadingIngredients,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoadingIngredients = true;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoadingIngredients = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoadingIngredients = false;
      });
  }
});


export const selectIngredientById = (id: string) => (state: RootState) => {
  return state.ingredients.ingredients.find((ingredient) => ingredient._id === id);
};

export const ingredientsReducer = ingredientsSlice.reducer;
export const {
  getIngredientsSelector,
  getMainIngredientsSelector,
  getBunsIngredientsSelector,
  getSaucesIngredientsSelector,
  getIngredientByIdSelector,
  getIsLoadingIngredientsSelector
} = ingredientsSlice.selectors;
