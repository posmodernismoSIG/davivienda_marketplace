// src/store/slices/ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersService } from '../../services/ordersService';

// Async thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await ordersService.getOrders(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error cargando pedidos');
    }
  }
);

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (id, { rejectWithValue }) => {
    try {
      const data = await ordersService.getOrder(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error cargando pedido');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await ordersService.createOrder(orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error creando pedido');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (id, { rejectWithValue }) => {
    try {
      await ordersService.cancelOrder(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error cancelando pedido');
    }
  }
);

export const fetchOrdersSummary = createAsyncThunk(
  'orders/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ordersService.getOrdersSummary();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error cargando resumen');
    }
  }
);

// Initial state
const initialState = {
  orders: [],
  currentOrder: null,
  summary: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
  loading: false,
  error: null,
  createOrderLoading: false,
};

// Slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.results || action.payload;
        state.pagination = {
          count: action.payload.count || 0,
          next: action.payload.next || null,
          previous: action.payload.previous || null,
        };
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single order
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.createOrderLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderLoading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderLoading = false;
        state.error = action.payload;
      })
      // Cancel order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const orderId = action.payload;
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
          order.status = 'cancelled';
        }
        if (state.currentOrder && state.currentOrder.id === orderId) {
          state.currentOrder.status = 'cancelled';
        }
      })
      // Fetch summary
      .addCase(fetchOrdersSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});

export const { clearError, clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;