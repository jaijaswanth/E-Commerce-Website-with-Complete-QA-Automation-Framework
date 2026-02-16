
import { Product, TestCase, BugReport } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Wireless Headphones', price: 299, category: 'Electronics', stock: 50, image: 'https://picsum.photos/seed/headphones/400/300', description: 'Noise cancelling high fidelity audio.' },
  { id: '2', name: 'Smart Fitness Watch', price: 199, category: 'Wearables', stock: 12, image: 'https://picsum.photos/seed/watch/400/300', description: 'Track your health and activities 24/7.' },
  { id: '3', name: 'Mechanical Gaming Keyboard', price: 149, category: 'Electronics', stock: 0, image: 'https://picsum.photos/seed/keyboard/400/300', description: 'RGB backlit tactile switches.' },
  { id: '4', name: 'Ultra-slim Laptop Pro', price: 1299, category: 'Electronics', stock: 5, image: 'https://picsum.photos/seed/laptop/400/300', description: 'Power meets portability for professionals.' },
  { id: '5', name: 'Designer Leather Backpack', price: 89, category: 'Fashion', stock: 25, image: 'https://picsum.photos/seed/bag/400/300', description: 'Durable and stylish everyday carry.' },
];

export const TEST_CASES: TestCase[] = Array.from({ length: 50 }, (_, i) => ({
  id: `TC-${i + 1}`,
  module: ['Auth', 'Product', 'Cart', 'Checkout', 'Admin'][i % 5],
  title: `Validate ${['login functionality', 'product search filter', 'cart quantity update', 'coupon code application', 'stock management'][i % 5]} scenario ${i}`,
  priority: i % 3 === 0 ? 'HIGH' : i % 3 === 1 ? 'MEDIUM' : 'LOW',
  steps: ['Open App', 'Perform Action', 'Verify Result'],
  expectedResult: 'System behaves as per PRD specifications.'
}));

export const BUG_REPORTS: BugReport[] = [
  { id: 'BUG-001', title: 'Cart subtotal mismatch when applying 100% coupon', severity: 'CRITICAL', status: 'OPEN', description: 'Total becomes negative when discount exceeds value.', reproSteps: ['Add item', 'Apply coupon TEST100', 'Check total'] },
  { id: 'BUG-002', title: 'Admin dashboard chart fails on empty order history', severity: 'MAJOR', status: 'IN_PROGRESS', description: 'Component throws error if data array is empty.', reproSteps: ['Login as Admin', 'Empty orders', 'View Dashboard'] },
  { id: 'BUG-003', title: 'Password field lacks minimum complexity validation', severity: 'MINOR', status: 'OPEN', description: 'System allows 1-character passwords.', reproSteps: ['Register', 'Enter "1"', 'Submit'] },
];
