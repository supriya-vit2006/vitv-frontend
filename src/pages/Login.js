import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import { saveUserSession } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetRegNo, setResetRegNo] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      saveUserSession(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/reset-password', {
        email: resetEmail,
        registrationNumber: resetRegNo,
        newPassword: resetNewPassword,
      });
      setMessage('Password reset successful. Please login.');
      setShowReset(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      {!showReset ? (
        <>
          <h2 className="text-2xl mb-4">Login</h2>
          {message && <p className="text-red-600">{message}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email ID"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
              Login
            </button>
          </form>
          <button
            className="mt-4 text-blue-600 underline"
            onClick={() => {
              setMessage('');
              setShowReset(true);
            }}
          >
            Reset Password
          </button>
          <p className="mt-4">
            New user?{' '}
            <Link to="/register" className="text-blue-600 underline">
              Register here
            </Link>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-4">Reset Password</h2>
          {message && <p className="text-red-600">{message}</p>}
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="email"
              placeholder="Email ID"
              className="w-full p-2 border rounded"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Registration Number (e.g. 24BCE2609)"
              className="w-full p-2 border rounded"
              value={resetRegNo}
              onChange={(e) => setResetRegNo(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border rounded"
              value={resetNewPassword}
              onChange={(e) => setResetNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
              Reset Password
            </button>
          </form>
          <button
            className="mt-4 text-blue-600 underline"
            onClick={() => {
              setMessage('');
              setShowReset(false);
            }}
          >
            Back to Login
          </button>
        </>
      )}
    </div>
  );
};

export default Login;