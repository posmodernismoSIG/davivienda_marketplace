// src/services/productsService.js
import api from './api';

export const productsService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const response = await api.get('/products/', { params });
    return response.data;
  },

  // Get product by ID
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured/');
    return response.data;
  },

  // Add review to product
  addReview: async (productId, reviewData) => {
    const response = await api.post(`/products/${productId}/add_review/`, reviewData);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await api.get('/categories/');
    return response.data;
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    const params = { search: query, ...filters };
    const response = await api.get('/products/', { params });
    return response.data;
  },
};