import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserData,
  getUserDataSelector,
  getUserOrders
} from '../../services/slices/userDataSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);
  
  const { userOrders, isLoadingUserOrder } = useSelector(getUserDataSelector);

  return <ProfileOrdersUI orders={userOrders} isLoading={isLoadingUserOrder}/>;
};
