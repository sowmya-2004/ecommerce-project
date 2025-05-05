import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const Catalog = () => {
  const { addToCart, isLoggedIn, setShowLoginModal } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5042/api/Product');
        if (response.data?.$values && Array.isArray(response.data.$values)) {
          setProducts(response.data.$values);
        } else {
          console.error('Expected array of products in "$values"');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.Category))];

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleAddToCart = (product) => {
    addToCart(product);
    setQuantities(prev => ({
      ...prev,
      [product.Id]: (prev[product.Id] || 0) + 1
    }));
  };

  const filteredProducts = products.filter(product =>
    (!selectedCategory || product.Category === selectedCategory) &&
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2>Product Catalog</h2>

      {/* Search and Filter */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            className="form-select"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="search" className="form-label">Search</label>
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Search by product name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.Id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm position-relative">
                <div className="card-body">
                  <h5 className="card-title">{product.Name}</h5>
                  <p className="card-text">Price: ${product.Price}</p>
                  
                  {/* Optional Details */}
                  {product.Model && <p>Model: {product.Model}</p>}
                  {product.RAM && <p>RAM: {product.RAM}</p>}
                  {product.Camera && <p>Camera: {product.Camera}</p>}

                  {/* Rating Display */}
                  {product.Rating && (
                    <p className="text-warning">
                      {Array.from({ length: Math.round(product.Rating) }, (_, i) => (
                        <FaStar key={i} />
                      ))}
                    </p>
                  )}

                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    {quantities[product.Id] ? (
                      <>
                        <FaShoppingCart className="me-2" />
                        Added ({quantities[product.Id]})
                      </>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No products found in this category or search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
