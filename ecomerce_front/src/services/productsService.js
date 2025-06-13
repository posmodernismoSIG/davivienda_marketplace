// // src/services/productsService.js
// import api from './api';

// export const productsService = {
//   // Get all products with filters
//   getProducts: async (params = {}) => {
//     const response = await api.get('/products/', { params });
//     return response.data;
//   },

//   // Get product by ID
//   getProduct: async (id) => {
//     const response = await api.get(`/products/${id}/`);
//     return response.data;
//   },

//   // Get featured products
//   getFeaturedProducts: async () => {
//     const response = await api.get('/products/featured/');
//     return response.data;
//   },

//   // Add review to product
//   addReview: async (productId, reviewData) => {
//     const response = await api.post(`/products/${productId}/add_review/`, reviewData);
//     return response.data;
//   },

//   // Get categories
//   getCategories: async () => {
//     const response = await api.get('/categories/');
//     return response.data;
//   },

//   // Search products
//   searchProducts: async (query, filters = {}) => {
//     const params = { search: query, ...filters };
//     const response = await api.get('/products/', { params });
//     return response.data;
//   },
// };


import api from './api';

export const productsService = {
  getProducts: async (params = {}) => {
    // LIMPIAR parámetros completamente
    const cleanParams = {};
    
    Object.entries(params).forEach(([key, value]) => {
      // Solo incluir valores válidos
      if (value !== null && value !== undefined && value !== '' && value !== 'undefined') {
        // Convertir números si es necesario
        if (key === 'page' || key === 'min_price' || key === 'max_price') {
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            cleanParams[key] = numValue;
          }
        } else {
          cleanParams[key] = String(value).trim();
        }
      }
    });
    
    console.log('📡 Parámetros finales enviados:', cleanParams);
    
    try {
      const response = await api.get('/products/', { params: cleanParams });
      console.log('✅ Respuesta exitosa:', response.data.count, 'productos');
      return response.data;
    } catch (error) {
      console.error('❌ Error en API:', error.response?.data);
      throw error;
    }
  },

  getProduct: async (id) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured/');
    return response.data;
  },

  addReview: async (productId, reviewData) => {
    const response = await api.post(`/products/${productId}/add_review/`, reviewData);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/categories/');
    return response.data;
  },

  searchProducts: async (query, filters = {}) => {
    const params = { search: query, ...filters };
    const response = await api.get('/products/', { params });
    return response.data;
  },
};