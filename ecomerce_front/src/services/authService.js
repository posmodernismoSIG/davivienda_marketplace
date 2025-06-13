// src/services/authService.js
import api from './api';

export const authService = {
  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/token/login/', credentials);
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await api.post('/auth/users/', userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/token/logout/');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/users/me/');
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.patch('/profile/update_profile/', profileData);
    return response.data;
  },

  // Verify profile completeness
  verifyProfile: async () => {
    const response = await api.post('/profile/verify_profile/');
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post('/auth/users/set_password/', passwordData);
    return response.data;
  },
};