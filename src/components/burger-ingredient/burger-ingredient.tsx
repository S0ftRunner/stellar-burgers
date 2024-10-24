import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addBun, addIngredient } from '../../services/slices/userOrderSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();

    const dispatch = useDispatch();


    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        console.log(`добавил булочку в стор: ${ingredient.name}`);
        dispatch(addBun(ingredient));
      } else {
        console.log(`добавил ингредиент в стор: ${ingredient.name}`);
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
