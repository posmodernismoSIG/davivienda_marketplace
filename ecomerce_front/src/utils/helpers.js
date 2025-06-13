export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) {
    return '$0';
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  
  try {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-CO', options);
  } catch (error) {
    return 'Fecha inválida';
  }
};

// CORRECCIÓN PRINCIPAL: Validar que text exista antes de usar .length
export const truncateText = (text, maxLength = 100) => {
  // Validar que text no sea null, undefined, o no sea string
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/300x250/f8f9fa/6c757d?text=Imagen+No+Disponible';
  if (imagePath.startsWith('http')) return imagePath;
  return `${process.env.REACT_APP_MEDIA_URL}/${imagePath}`;
};

export const calculateCartTotal = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => {
    const itemPrice = item.price || 0;
    const itemQuantity = item.quantity || 0;
    return total + (itemPrice * itemQuantity);
  }, 0);
};

export const getOrderStatusBadge = (status) => {
  const badges = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'danger',
  };
  return badges[status] || 'secondary';
};