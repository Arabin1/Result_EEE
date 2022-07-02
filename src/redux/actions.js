import {C} from './Constant';

export const selectBetweenRange = (number1, number2) => ({
  type: C.SELECT_BETWEEN_RANGE,
  number1,
  number2,
});
