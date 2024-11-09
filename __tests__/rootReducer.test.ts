import { rootReducer, store } from '../src/services/store';

describe('тестирование корневого редьюсера', () => {
  test('вызов корневого редьюсера с undefined и type: UNKNOWN', () => {
    const before = store.getState();
    const after = rootReducer(undefined, {type: 'UNKNOWN_ACTION'});
    expect(after).toEqual(before);
  })
})