const API_BASE = ''; // Base URL for the API (Empty because of Gateway)

const handleResponse = async (res) => {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || 'API Error');
    return data;
  }
  
  // Non-JSON response (likely HTML error page)
  if (!res.ok) {
    if (res.status === 404) throw new Error('API Endpoint not found (404)');
    if (res.status === 502 || res.status === 503) throw new Error('Service temporarily unavailable (Gateway Error)');
    throw new Error(`Server returned non-JSON response (${res.status})`);
  }
  throw new Error('Expected JSON response but received something else');
};

const api = {
  // User Authentication
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  getAllUsers: async () => {
    const res = await fetch(`${API_BASE}/api/users`);
    return handleResponse(res);
  },

  // Products
  getProducts: async () => {
    const res = await fetch(`${API_BASE}/api/products`);
    return handleResponse(res);
  },

  // Quotations
  getQuotation: async (params) => {
    const res = await fetch(`${API_BASE}/api/quotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return handleResponse(res);
  },

  // Orders
  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return handleResponse(res);
  },

  getOrders: async (userId) => {
    const res = await fetch(`${API_BASE}/api/orders/${userId}`);
    return handleResponse(res);
  },

  // Retailers
  getRetailers: async () => {
    const res = await fetch(`${API_BASE}/api/retailers`);
    return handleResponse(res);
  },

  getNearestRetailer: async (coords) => {
    const res = await fetch(`${API_BASE}/api/retailers/nearest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coords),
    });
    return handleResponse(res);
  }
};

export default api;
