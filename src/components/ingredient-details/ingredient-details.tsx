import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredientById } from '../../services/slices/ingredientSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
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
