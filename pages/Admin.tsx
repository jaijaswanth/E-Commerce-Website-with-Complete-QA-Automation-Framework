
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockApiService } from '../services/mockApiService';
import { Product } from '../types';

const Admin: React.FC = () => {
  const [stats, setStats] = useState({ revenue: 0, totalOrders: 0, lowStock: 0 });
  const [products, setProducts] = useState<Product[]>([]);
  
  const chartData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  useEffect(() => {
    mockApiService.getAnalytics().then(setStats);
    mockApiService.getProducts().then(setProducts);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Command Center</h1>
          <p className="text-gray-500">Inventory control and performance tracking.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">
          <i className="fas fa-plus mr-2"></i> New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><i className="fas fa-dollar-sign text-2xl"></i></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.revenue}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><i className="fas fa-shopping-cart text-2xl"></i></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Orders Processed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg"><i className="fas fa-exclamation-triangle text-2xl"></i></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="text-lg font-bold mb-4">Weekly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
          <h3 className="text-lg font-bold mb-4">Stock Levels by Product</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={products}>
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stock" fill="#fbbf24" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
            <h3 className="text-lg font-bold">Inventory Management</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {products.map(p => (
              <tr key={p.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">${p.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {p.stock} Units
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800"><i className="fas fa-edit"></i></button>
                  <button className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
