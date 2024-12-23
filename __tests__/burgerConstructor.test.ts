import {
  userOrderReducer,
  initialState,
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetUserOrder
} from '../src/services/slices/userOrderSlice';
import { v4 as uuidv4 } from 'uuid';

const sauceMockData = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

const cutletMockData = {
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
};

const bunMockData = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

describe('Проверка добавлений ингредиентов и булочки: ', () => {
  test('Добавление ингредиенов: ', () => {
    const state = userOrderReducer(initialState, addIngredient(cutletMockData));

    // игредиент первый добавился
    expect(state.ingredients).toHaveLength(1);

    const newIngredient = { ...state.ingredients[0] } as Record<string, any>;
    delete newIngredient['id'];

    const oldIngredient = { ...cutletMockData } as Record<string, any>;
    delete oldIngredient['id'];

    expect(newIngredient).toEqual(oldIngredient);
  });

  test('Добавление булочки: ', () => {
    const state = userOrderReducer(initialState, addIngredient(bunMockData));

    const newBun = { ...state.bun } as Record<string, any>;
    delete newBun['id'];

    const oldBun = { ...bunMockData } as Record<string, any>;
    delete oldBun['id'];

    expect(newBun).toEqual(oldBun);

    // смотрим, не добавились ли другие ингредиенты
    expect(state.ingredients).toHaveLength(0);
  });
});

describe('Передвижение и удаление игредиентов: ', () => {
  test('Удаление игредиента: ', () => {
    const state = userOrderReducer(initialState, addIngredient(sauceMockData));

    // смотрим, есть ли у нас ингредиенты в массиве
    expect(state.ingredients).toHaveLength(1);

    const newState = userOrderReducer(
      state,
      deleteIngredient(sauceMockData._id)
    );

    // ингредиента больше нет
    expect(newState.ingredients).toHaveLength(0);

    // булочка без изменений
    expect(newState.bun).toBeNull();
  });

  test('Перемещение ингредиента cutletMockData на позицию выше: ', () => {
    const mockSauceId = uuidv4();
    const mockCutletId = uuidv4();

    const mockInitialState = {
      bun: null,
      ingredients: [
        { ...sauceMockData, id: mockSauceId },
        { ...cutletMockData, id: mockCutletId }
      ],
      orderResponse: null,
      orderRequest: false
    };

    const state = userOrderReducer(
      mockInitialState,
      moveUpIngredient({ index: 1 })
    );

    // по-прежнему 2 игредиента
    expect(state.ingredients).toHaveLength(2);

    expect(state.ingredients[0]).toEqual({
      ...cutletMockData,
      id: mockCutletId
    });
    expect(state.ingredients[1]).toEqual({ ...sauceMockData, id: mockSauceId });

    // булочка не изменилась
    expect(state.bun).toBeNull();
  });

  test('Перемещение ингредиента sauceMockData на позицию ниже: ', () => {
    const mockSauceId = uuidv4();
    const mockCutletId = uuidv4();
    const mockInitialState = {
      bun: null,
      ingredients: [
        { ...sauceMockData, id: mockSauceId },
        { ...cutletMockData, id: mockCutletId }
      ],
      orderResponse: null,
      orderRequest: false
    };

    const state = userOrderReducer(
      mockInitialState,
      moveDownIngredient({ index: 0 })
    );

    // по-прежнему 2 игредиента
    expect(state.ingredients).toHaveLength(2);

    expect(state.ingredients[0]).toEqual({
      ...cutletMockData,
      id: mockCutletId
    });
    expect(state.ingredients[1]).toEqual({ ...sauceMockData, id: mockSauceId });

    // булочка не изменилась
    expect(state.bun).toBeNull();
  });

  test('Очистка ингредиентов: ', () => {
    const mockInitialState = {
      bun: bunMockData,
      ingredients: [{ ...sauceMockData, id: uuidv4() }],
      orderResponse: null,
      orderRequest: false
    };

    const state = userOrderReducer(mockInitialState, resetUserOrder());

    expect(state.bun).toBeNull();

    expect(state.ingredients).toHaveLength(0);
  });
});
