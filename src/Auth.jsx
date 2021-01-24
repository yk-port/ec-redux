import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWithSignedIn } from './reducks/users/selectors';
import { listenAuthState } from './reducks/users/operations';

const Auth = ({children }) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const isSignedIn = getWithSignedIn(selector);

  // Authコンポーネントの最初のrenderが走った後に実行したい関数を記述する
  // もしloginしていない状態（isSignedInがfalseだったら）operationsで作成した認証にリッスンを制御する関数（listenAuthState）を動かす
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
}

export default Auth;
