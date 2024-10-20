import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { createOrder, getUserOrderBun, getUserOrderIngredients, resetUserOrder } from '../../services/slices/userOrderSlice';
import { getUserDataSelector } from '../../services/slices/userDataSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const userOrderIngredients = useSelector(getUserOrderIngredients);
  const userOrderBun = useSelector(getUserOrderBun);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuth} = useSelector(getUserDataSelector);
  
  const constructorItems = {
    bun: userOrderBun,
    ingredients: userOrderIngredients,
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      return navigate('/login');
    }

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(ingredient => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(orderData));

  };
  const closeOrderModal = () => {
    dispatch(resetUserOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
