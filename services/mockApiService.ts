
import { Product, Order, User, UserRole, CartItem } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

// Simulated In-Memory Database
let products: Product[] = [...INITIAL_PRODUCTS];
let orders: Order[] = [];
let currentUser: User | null = null;

export const mockApiService = {
  // Auth
  login: async (email: string, role: UserRole): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = { id: Math.random().toString(36), name: email.split('@')[0], email, role };
        resolve(currentUser);
      }, 500);
    });
  },
  
  logout: () => { currentUser = null; },

  getCurrentUser: () => currentUser,

  // Products
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(products), 300));
  },

  updateProduct: async (updated: Product) => {
    products = products.map(p => p.id === updated.id ? updated : p);
  },

  deleteProduct: async (id: string) => {
    products = products.filter(p => p.id !== id);
  },

  // Orders
  createOrder: async (items: CartItem[], total: number): Promise<Order> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate stock
        for(const item of items) {
            const p = products.find(prod => prod.id === item.productId);
            if(!p || p.stock < item.quantity) return reject(`Insufficient stock for ${p?.name}`);
        }

        // Deduct stock
        items.forEach(item => {
            const p = products.find(prod => prod.id === item.productId);
            if(p) p.stock -= item.quantity;
        });

        const newOrder: Order = {
          id: `ORD-${Date.now()}`,
          userId: currentUser?.id || 'guest',
          items,
          total,
          status: 'PAID',
          createdAt: new Date().toISOString()
        };
        orders = [newOrder, ...orders];
        resolve(newOrder);
      }, 800);
    });
  },

  getOrders: async (): Promise<Order[]> => orders,

  // Analytics
  getAnalytics: async () => {
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const lowStock = products.filter(p => p.stock < 5).length;
    return { revenue, totalOrders, lowStock };
  }
};
