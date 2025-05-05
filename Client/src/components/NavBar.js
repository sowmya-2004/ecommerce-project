import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; // Link to custom styles

const Navbar = () => {
  const { logout, cartItems, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-lg navbar-dark px-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand brand-logo">
          <img src="./logo.png" alt="Logo" height="30" style={{ marginRight: '10px' }} />
          ClickNCart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/catalog" className="nav-link">Catalog</Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">Orders</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart <span className="badge bg-warning text-dark ms-1">{cartItems.length}</span>
              </Link>
            </li>
          </ul>

          {isLoggedIn ? (
            <button className="btn btn-warning text-dark fw-bold" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-light">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
