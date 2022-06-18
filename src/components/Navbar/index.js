import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bookmark } from '@mui/icons-material';
import './style.scss';

const Navbar = () => {
  return (
    <nav>
        <div className='container'>
            <div className="login-link">
                <Bookmark />
                <NavLink to="/">
                  <h1>Trello Board Clone</h1>
                </NavLink>
            </div>
            <div className="login-link">
              <NavLink to="/login" >Login</NavLink>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;