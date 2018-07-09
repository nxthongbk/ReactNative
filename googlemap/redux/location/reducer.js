import { actions } from './action';

export const Location = (state = null, action) => {
  switch (action.type) {
    case actions.SET_LOCATION:
      return action.payload;
    default :
      return state;
  }
};
