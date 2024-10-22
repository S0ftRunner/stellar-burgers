import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserData,
  getUserDataSelector
} from '../../services/slices/userDataSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  
  const { userOrders } = useSelector(getUserDataSelector) || '';

  return <ProfileOrdersUI orders={userOrders} />;
};
