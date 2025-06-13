import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { FaTimes, FaShoppingBag } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeCart, selectCartItems, selectCartTotal } from '../../store/slices/cartSlice';
import { formatPrice } from '../../utils/helpers';
import CartItem from './CartItem';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen } = useSelector((state) => state.cart);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleCheckout = () => {
    dispatch(closeCart());
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  };

  const handleContinueShopping = () => {
    dispatch(closeCart());
    navigate('/products');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="cart-overlay" 
        onClick={handleClose}
      />
      
      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="cart-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaShoppingBag className="me-2" />
            Carrito de Compras
          </h5>
          <Button 
            variant="outline-light" 
            size="sm"
            onClick={handleClose}
          >
            <FaTimes />
          </Button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <FaShoppingBag size={48} className="text-muted mb-3" />
              <h6 className="text-muted">Tu carrito está vacío</h6>
              <p className="text-muted small">
                Agrega algunos productos para comenzar
              </p>
              <Button 
                variant="primary" 
                onClick={handleContinueShopping}
                className="mt-2"
              >
                Explorar Productos
              </Button>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Total:</h5>
              <h5 className="mb-0 text-primary">
                {formatPrice(cartTotal)}
              </h5>
            </div>
            
            {!isAuthenticated && (
              <Alert variant="info" className="py-2 small">
                Inicia sesión para continuar con la compra
              </Alert>
            )}
            
            <Button 
              variant="success" 
              size="lg" 
              className="w-100 mb-2"
              onClick={handleCheckout}
            >
              {isAuthenticated ? 'Proceder al Pago' : 'Iniciar Sesión'}
            </Button>
            
            <Button 
              variant="outline-primary" 
              className="w-100"
              onClick={handleContinueShopping}
            >
              Continuar Comprando
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
