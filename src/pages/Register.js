import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../utils/api';
import { saveUserSession } from '../utils/auth';

const Register = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', {
        registrationNumber,
        email,
        username,
        password,
      });
      saveUserSession(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl mb-4">Register</h2>
      {message && <p className="text-red-600">{message}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Registration Number (e.g. 24BCE2609)"
          className="w-full p-2 border rounded"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
          required
          pattern="[0-9]{2}[A-Z]{3}[0-9]{4}"
          title="Format: 24BCE2609"
        />
        <input
          type="email"
          placeholder="Email ID (must end with @vitstudent.ac.in)"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          required
          pattern="^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$"
          title="Email must end with @vitstudent.ac.in"
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          maxLength={30}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;