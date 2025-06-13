// src/services/ordersService.js
import api from './api';

export const ordersService = {
  // Get user orders
  getOrders: async (params = {}) => {
    const response = await api.get('/orders/', { params });
    return response.data;
  },

  // Get order by ID
  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}/`);
    return response.data;
  },

  // Create order
  createOrder: async (orderData) => {
    const response = await api.post('/orders/', orderData);
    return response.data;
  },

  // Cancel order
  cancelOrder: async (id) => {
    const response = await api.patch(`/orders/${id}/cancel/`);
    return response.data;
  },

  // Get orders summary
  getOrdersSummary: async () => {
    const response = await api.get('/orders/summary/');
    return response.data;
  },
};