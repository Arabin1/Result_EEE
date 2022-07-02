import {
  C,
  cgpa,
  dataSet,
  semester1,
  semester2,
  semester3,
  semester4,
  semester5,
  year1,
  year2,
} from './Constant';

const initialState = {
  dataSet,
  semester1,
  semester2,
  semester3,
  semester4,
  semester5,
  year1,
  year2,
  cgpa,
};

export const resultManager = (state = initialState, action) => {
  switch (action.type) {
    case C.SELECT_BETWEEN_RANGE:
      return state;
    default:
      return state;
  }
};
