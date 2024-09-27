import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch } from '../../services/store';
import { getIngredientByIdSelector, selectIngredientById } from '../../services/slices/ingredientSlice';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const {id} = useParams();
  let ingredientData = null;
  if (id) {
    ingredientData = useSelector(selectIngredientById(id));
  }

  if (!ingredientData) {
    return <Preloader />;      
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
