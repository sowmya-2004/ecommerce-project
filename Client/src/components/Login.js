import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
//import './Login.css'; // Custom CSS for styling

const Login = () => {
  const { login } = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Implement login logic here
    login();
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-form bg-white p-5 rounded shadow">
        <h2 className="mb-4 text-center">Login to ClickNCart</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Username</label>
            <input
              type="text"
              id="userName"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

