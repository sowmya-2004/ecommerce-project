import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

import bgImage from './image.jpg'; // make sure this image exists in the correct path

const Home = () => {
  const { cartItems } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '40px',
          borderRadius: '10px',
          maxWidth: '600px',
          width: '90%',
        }}
      >
        <h1 style={{ color: 'white' }}>
          Welcome to{' '}
          <span style={{ fontWeight: 'bold', color: '#ffcc00' }}>ClickNCart</span> 🛒
        </h1>
        <p style={{ color: 'white', marginBottom: '20px' }}>
          Discover amazing products and deals tailored just for you.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <button
            onClick={() => navigate('/catalog')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: 'white',
            }}
          >
            Browse Catalog
          </button>
          <button
            onClick={() => navigate('/cart')}
            disabled={!cartItems.length}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: cartItems.length ? 'pointer' : 'not-allowed',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#6c757d',
              color: 'white',
              opacity: cartItems.length ? 1 : 0.6,
            }}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
