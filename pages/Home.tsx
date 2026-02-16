
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { mockApiService } from '../services/mockApiService';

const Home: React.FC<{ addToCart: (p: Product) => void }> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApiService.getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = products.filter(p => 
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Shop Premium Essentials</h1>
        <p className="mt-4 text-xl text-gray-500">Experience our top-rated products curated for performance and style.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Wearables</option>
          <option>Fashion</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
              <div className="relative h-56 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold bg-red-600 px-3 py-1 rounded">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button 
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                    className="bg-gray-900 text-white p-2 rounded-lg hover:bg-indigo-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-plus mr-2"></i> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
