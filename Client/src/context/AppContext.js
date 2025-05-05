import React, { createContext, useState, useEffect } from 'react';

// Creating the AppContext for global state
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  // Sync to localStorage when isLoggedIn or cartItems change
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [isLoggedIn, cartItems]);

  const login = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setShowLoginModal(true);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.Id === product.Id);
      if (existingItem) {
        return prevItems.map(item =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.Id !== productId));
  };

  const updateCartQuantity = (productId, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map(item =>
          item.Id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      setShowLoginModal,
      showLoginModal,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
