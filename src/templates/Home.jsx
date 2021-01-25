import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducks/users/operations';
import { getUserId, getUserName } from '../reducks/users/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const userName = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
      <p>{userName}</p>
      <button onClick={() => dispatch(logout())}>SIGN OUT</button>
    </div>
  )
}

export default Home
