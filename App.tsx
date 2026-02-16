
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { User, UserRole, Product, CartItem, TestCase, BugReport } from './types';
import { mockApiService } from './services/mockApiService';
import Home from './pages/Home';
import Admin from './pages/Admin';
import QA from './pages/QA';
import Login from './pages/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { productId: product.id, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.productId !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar user={user} setUser={setUser} cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/admin" element={user?.role === UserRole.ADMIN ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/qa" element={<QA />} />
          </Routes>
        </main>

        <Footer />
        
        {isCartOpen && (
          <CartSidebar 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart}
            onCheckout={async (total) => {
                try {
                    await mockApiService.createOrder(cart, total);
                    alert("Order placed successfully!");
                    clearCart();
                    setIsCartOpen(false);
                } catch (e) {
                    alert(e);
                }
            }}
          />
        )}
      </div>
    </Router>
  );
};

const Navbar: React.FC<{ user: User | null, setUser: (u: User | null) => void, cartCount: number, onCartClick: () => void }> = ({ user, setUser, cartCount, onCartClick }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center">
          <i className="fas fa-shopping-bag mr-2"></i> QA-PRO Shop
        </Link>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">Browse</Link>
          <Link to="/qa" className="text-gray-600 hover:text-indigo-600">QA Framework</Link>
          {user?.role === UserRole.ADMIN && <Link to="/admin" className="text-gray-600 hover:text-indigo-600">Admin Dashboard</Link>}
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={onCartClick} className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <i className="fas fa-shopping-cart text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          {user ? (
            <div className="flex items-center space-x-3 border-l pl-4">
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button onClick={() => { setUser(null); navigate('/'); }} className="text-sm text-red-600 hover:underline">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const CartSidebar: React.FC<{ cart: CartItem[], onClose: () => void, onRemove: (id: string) => void, onCheckout: (t: number) => void }> = ({ cart, onClose, onRemove, onCheckout }) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { mockApiService.getProducts().then(setProducts); }, []);

  const cartDetails = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)
  })).filter(i => i.product);

  const total = cartDetails.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition ease-in-out duration-500">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="mt-8">
                {cartDetails.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
                ) : (
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartDetails.map((item) => (
                      <li key={item.productId} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img src={item.product?.image} alt={item.product?.name} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.product?.name}</h3>
                              <p className="ml-4">${item.product?.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <button onClick={() => onRemove(item.productId)} className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button 
                  disabled={cartDetails.length === 0}
                  onClick={() => onCheckout(total)}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-white border-t py-8 mt-auto">
    <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
      <p>&copy; 2024 QA-Pro E-Commerce Framework. All rights reserved.</p>
      <p className="mt-2">Simulated Enterprise SDET Lab Project</p>
    </div>
  </footer>
);

export default App;
