import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import { selectUser } from './userSlice';


const LoginPanel = () => {
    const user = useSelector(selectUser);
  return (
    <div>
    {user ? <Logout /> : <Login/>}
  </div>
  )
}

export default LoginPanel;