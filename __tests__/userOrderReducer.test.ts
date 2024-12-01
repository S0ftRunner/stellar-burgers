import { userOrderReducer, createOrder, initialState } from "../src/services/slices/userOrderSlice";
import { resetOrderModalData, getFeeds } from "../src/services/slices/feedsSlice";

const orderMockData = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c',
    ],
    _id: '66223473h74df0231c0462b3',
    status: 'done',
    name: 'TEST_NAME',
    createdAt: '2024-10-19T09:10:21.123Z',
    updatedAt: '2024-10-19T09:10:24.123Z',
    number: 43223,
  }
]

describe('тест userOrderReducer', () => {
  const initState = {
    
  }
})