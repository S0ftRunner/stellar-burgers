import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFeeds, getFeedsSelector, getIsLoadingOrderSelector } from '../../services/slices/feedsSlice';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);
  const orders: TOrder[] = useSelector(getFeedsSelector);
  const isLoading = useSelector(getIsLoadingOrderSelector);
  const handleGetFeeds = () => {
    dispatch(getFeeds());
  }

  if (isLoading) {
    return <Preloader />
  }
  
  if (!orders.length) {
    return <Preloader />;
  }



  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
