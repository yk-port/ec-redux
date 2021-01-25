import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

// signInしているかどうか確認するためのselector関数
// getIsSignedInメソッドが呼び出されれば、現在のstoreのisSignedInの状態が返される関数
export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
);

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
);

export const getUserName = createSelector(
  [usersSelector],
  state => state.userName
);
