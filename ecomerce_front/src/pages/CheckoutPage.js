import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import { FaCreditCard, FaShoppingCart, FaLock } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createOrder } from '../store/slices/ordersSlice';
import { clearCart, selectCartItems, selectCartTotal } from '../store/slices/cartSlice';
import { formatPrice, getImageUrl } from '../utils/helpers';
import { toast } from 'react-toastify';

const schema = yup.object({
  shipping_address: yup.string().required('La dirección de envío es requerida'),
  phone: yup.string().required('El teléfono es requerido'),
  notes: yup.string(),
});

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const { user } = useSelector((state) => state.auth);
  const { createOrderLoading } = useSelector((state) => state.orders);
  
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      shipping_address: user?.address || '',
      phone: user?.phone || '',
      notes: '',
    },
  });

  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/products');
    }
  }, [cartItems.length, navigate]);

  const onSubmit = async (data) => {
    const orderData = {
      ...data,
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      toast.success('¡Pedido creado exitosamente!');
      navigate('/orders');
    } catch (error) {
      toast.error('Error al crear el pedido. Inténtalo de nuevo.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          <h4>Tu carrito está vacío</h4>
          <p>Agrega algunos productos antes de continuar con el checkout.</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Explorar Productos
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="mb-4">
            <FaShoppingCart className="me-2" />
            Finalizar Compra
          </h2>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {/* Shipping Information */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Información de Envío</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        value={`${user?.first_name || ''} ${user?.last_name || ''}`.trim()}
                        readOnly
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Dirección de Envío *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ingresa tu dirección completa..."
                    {...register('shipping_address')}
                    isInvalid={!!errors.shipping_address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.shipping_address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono *</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="+57 300 123 4567"
                        {...register('phone')}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Notas Adicionales</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Instrucciones especiales de entrega..."
                        {...register('notes')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          {/* Payment Method */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Método de Pago</h5>
            </Card.Header>
            <Card.Body>
              <Form.Check
                type="radio"
                id="credit_card"
                name="paymentMethod"
                label={
                  <span>
                    <FaCreditCard className="me-2" />
                    Tarjeta de Crédito/Débito
                  </span>
                }
                checked={paymentMethod === 'credit_card'}
                onChange={() => setPaymentMethod('credit_card')}
                className="mb-3"
              />
              
              <Form.Check
                type="radio"
                id="bank_transfer"
                name="paymentMethod"
                label="Transferencia Bancaria"
                checked={paymentMethod === 'bank_transfer'}
                onChange={() => setPaymentMethod('bank_transfer')}
                className="mb-3"
              />
              
              <Form.Check
                type="radio"
                id="cash_on_delivery"
                name="paymentMethod"
                label="Pago Contraentrega"
                checked={paymentMethod === 'cash_on_delivery'}
                onChange={() => setPaymentMethod('cash_on_delivery')}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Order Summary */}
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="px-0">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ height: '50px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col xs={6}>
                        <h6 className="mb-1 small">{item.name}</h6>
                        <small className="text-muted">Cantidad: {item.quantity}</small>
                      </Col>
                      <Col xs={3} className="text-end">
                        <strong>{formatPrice(item.price * item.quantity)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  <span className="text-success">Gratis</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <h5>Total:</h5>
                  <h5 className="text-primary">{formatPrice(cartTotal)}</h5>
                </div>
              </div>

              <Button
                variant="success"
                size="lg"
                className="w-100"
                onClick={handleSubmit(onSubmit)}
                disabled={createOrderLoading}
              >
                {createOrderLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <FaLock className="me-2" />
                    Confirmar Pedido
                  </>
                )}
              </Button>

              <div className="text-center mt-3">
                <small className="text-muted">
                  <FaLock className="me-1" />
                  Pago seguro y protegido
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
