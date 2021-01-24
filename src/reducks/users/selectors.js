import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

// signInしているかどうか確認するためのselector関数
// getWithSignedInメソッドが呼び出されれば、現在のstoreのisSignedInの状態が返される関数
export const getWithSignedIn = createSelector(
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
