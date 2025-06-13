// src/store/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsService } from '../../services/productsService';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await productsService.getProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error cargando productos');
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const data = await productsService.getProduct(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error cargando producto');
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productsService.getFeaturedProducts();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error cargando productos destacados');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productsService.getCategories();
      return data.results || data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error cargando categorías');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ query, filters }, { rejectWithValue }) => {
    try {
      const data = await productsService.searchProducts(query, filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error en búsqueda');
    }
  }
);

export const addProductReview = createAsyncThunk(
  'products/addReview',
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const data = await productsService.addReview(productId, reviewData);
      return { productId, review: data };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error agregando reseña');
    }
  }
);

// Initial state
const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
  },
  filters: {
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    ordering: '-created_at',
  },
  loading: false,
  error: null,
};

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.results || action.payload;
        state.pagination = {
          count: action.payload.count || action.payload.length,
          next: action.payload.next || null,
          previous: action.payload.previous || null,
          currentPage: 1,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch featured products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.results || action.payload;
      })
      // Add review
      .addCase(addProductReview.fulfilled, (state, action) => {
        if (state.currentProduct && state.currentProduct.id === action.payload.productId) {
          state.currentProduct.reviews.push(action.payload.review);
        }
      });
  },
});

export const { setFilters, clearFilters, clearError, clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;