import * as Actions from './actions';
import initialState from '../sotre/initialState';

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload
      };

    case Actions.SIGN_OUT:
      return {
        ...state.payload
      };

    default:
      return state;
  }
};
