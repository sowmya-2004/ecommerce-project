import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateCartQuantity,
    isLoggedIn,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const handleGoToBilling = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate('/billing');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.Price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.Id}>
                  <td>{item.Name}</td>
                  <td>${item.Price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => updateCartQuantity(item.Id, 'decrease')}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => updateCartQuantity(item.Id, 'increase')}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.Price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.Id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ${totalAmount.toFixed(2)}</h4>
            <div>
              <button className="btn btn-success me-2" onClick={handleGoToBilling}>
                Proceed to Billing
              </button>
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

