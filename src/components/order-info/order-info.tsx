import { FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getFeedByNumberSelector,
  getFeeds,
  getOrderByNumber,
  getOrderModalDataSelector,
} from '../../services/slices/feedsSlice';
import {
  getIngredients,
  getIngredientsSelector
} from '../../services/slices/ingredientSlice';
import { useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderData = useSelector(getOrderModalDataSelector);

  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)))
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      console.log()
      console.log(orderData);
      console.log('ничего не работает');
      return null;
    }

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return null;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
