import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearUserSession, getUser } from '../utils/auth';

const Header = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUserSession();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <Link to="/" className="font-bold text-xl">
        VIT TRAVEL BUDDY
      </Link>
      <nav>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.username}</span>
            <button onClick={handleLogout} className="bg-blue-800 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;