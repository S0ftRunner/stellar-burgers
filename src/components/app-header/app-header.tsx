import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserDataSelector } from '../../services/slices/userDataSlice';

export const AppHeader: FC = () => {
  const {data} = useSelector(getUserDataSelector)
  return (<AppHeaderUI userName={data.name || ''} />);
};
