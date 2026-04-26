const API_BASE = ''; // Base URL for the API (Empty because of Gateway)

const api = {
  // User Authentication
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Invalid email or password');
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  getAllUsers: async () => {
    const res = await fetch(`${API_BASE}/api/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  // Products
  getProducts: async () => {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  // Quotations
  getQuotation: async (params) => {
    const res = await fetch(`${API_BASE}/api/quotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Failed to calculate quotation');
    return res.json();
  },

  // Orders
  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error('Failed to place order');
    return res.json();
  },

  getOrders: async (userId) => {
    const res = await fetch(`${API_BASE}/api/orders/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  // Retailers
  getRetailers: async () => {
    const res = await fetch(`${API_BASE}/api/retailers`);
    if (!res.ok) throw new Error('Failed to fetch retailers');
    return res.json();
  },

  getNearestRetailer: async (coords) => {
    const res = await fetch(`${API_BASE}/api/retailers/nearest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coords),
    });
    if (!res.ok) throw new Error('Failed to find nearest retailer');
    return res.json();
  }
};

export default api;
