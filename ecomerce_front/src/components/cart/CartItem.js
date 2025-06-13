import React from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { formatPrice, getImageUrl } from '../../utils/helpers';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateQuantity({ productId: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <Row className="align-items-center">
        <Col xs={3}>
          <Image 
            src={getImageUrl(item.image)} 
            alt={item.name}
            fluid
            rounded
            style={{ height: '60px', objectFit: 'cover' }}
          />
        </Col>
        
        <Col xs={9}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6 className="mb-1 fw-semibold">{item.name}</h6>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleRemove}
            >
              <FaTrash size={12} />
            </Button>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                <FaMinus size={10} />
              </Button>
              
              <span className="mx-2 fw-semibold">{item.quantity}</span>
              
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <FaPlus size={10} />
              </Button>
            </div>
            
            <div className="text-end">
              <div className="fw-bold text-primary">
                {formatPrice(item.price * item.quantity)}
              </div>
              <small className="text-muted">
                {formatPrice(item.price)} c/u
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
