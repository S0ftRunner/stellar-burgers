import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { deleteIngredient, moveDownIngredient, moveUpIngredient } from '../../services/slices/userOrderSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    // добавить drag and drop

    const dispatch = useDispatch()
    const handleMoveDown = () => {
      dispatch(moveDownIngredient({index}));
    };

    const handleMoveUp = () => {
      dispatch(moveUpIngredient({index}));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(ingredient._id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
