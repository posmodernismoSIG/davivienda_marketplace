// src/utils/constants.js
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
export const MEDIA_URL = process.env.REACT_APP_MEDIA_URL || 'http://localhost:8000/media';

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pendiente',
  [ORDER_STATUS.PROCESSING]: 'Procesando',
  [ORDER_STATUS.SHIPPED]: 'Enviado',
  [ORDER_STATUS.DELIVERED]: 'Entregado',
  [ORDER_STATUS.CANCELLED]: 'Cancelado',
};

export const PRODUCT_CATEGORIES = {
  ELECTRONICS: 'Electrónicos',
  CLOTHING: 'Ropa',
  HOME: 'Hogar',
  BOOKS: 'Libros',
  SPORTS: 'Deportes',
  FINANCIAL: 'Productos Financieros',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
};