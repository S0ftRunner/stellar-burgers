import {
  ingredientsReducer,
  getIngredients,
  initialState
} from '../src/services/slices/ingredientSlice';

const ingredientMockData = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];

describe('тестирование ibgredientsReducer', () => {
  test('Начало запроса', () => {
    const state = ingredientsReducer(
      initialState,
      getIngredients.pending('pending')
    );
    expect(state.isLoadingIngredients).toBeTruthy();
  });

  test('Результат запроса', () => {
    const state = ingredientsReducer(
      initialState,
      getIngredients.fulfilled(ingredientMockData, 'fulfilled')
    );

    expect(state.isLoadingIngredients).toBeFalsy();
    expect(state.ingredients).toEqual(ingredientMockData);
  });
});
