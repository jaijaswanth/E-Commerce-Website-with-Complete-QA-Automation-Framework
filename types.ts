
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED';
  createdAt: string;
}

export interface TestCase {
  id: string;
  module: string;
  title: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  steps: string[];
  expectedResult: string;
}

export interface BugReport {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'MAJOR' | 'MINOR';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  description: string;
  reproSteps: string[];
}
