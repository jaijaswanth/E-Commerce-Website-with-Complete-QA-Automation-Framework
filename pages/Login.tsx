
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { mockApiService } from '../services/mockApiService';

const Login: React.FC<{ setUser: (u: User) => void }> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await mockApiService.login(email || 'demo@user.com', role);
    setUser(user);
    navigate(role === UserRole.ADMIN ? '/admin' : '/');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
        <p className="text-gray-500 mt-2">Access your personalized shopping experience</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            placeholder="demo@example.com" 
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Login As</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={() => setRole(UserRole.CUSTOMER)}
              className={`py-3 rounded-xl text-sm font-bold border-2 transition ${role === UserRole.CUSTOMER ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              <i className="fas fa-user mr-2"></i> Customer
            </button>
            <button 
              type="button" 
              onClick={() => setRole(UserRole.ADMIN)}
              className={`py-3 rounded-xl text-sm font-bold border-2 transition ${role === UserRole.ADMIN ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              <i className="fas fa-user-shield mr-2"></i> Admin
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
        >
          Proceed to Dashboard
        </button>
      </form>
      
      <div className="mt-8 pt-8 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400">Testing Environment: No real password required.</p>
      </div>
    </div>
  );
};

export default Login;
