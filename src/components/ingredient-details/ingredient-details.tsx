import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch } from '../../services/store';
import { getIngredientByIdSelector } from 'src/services/slices/ingredientSlice';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// TODO: придумать как взять переменную из стора по айди
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientData = null;

  if (!ingredientData) {
    return <Preloader />;      
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
