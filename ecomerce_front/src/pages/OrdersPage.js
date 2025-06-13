import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { FaEye, FaTimes, FaShoppingBag } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders, cancelOrder, fetchOrdersSummary } from '../store/slices/ordersSlice';
import { formatPrice, formatDate, getOrderStatusBadge } from '../utils/helpers';
import { ORDER_STATUS_LABELS } from '../utils/constants';
import Loading from '../components/common/Loading';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, summary, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchOrdersSummary());
  }, [dispatch]);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar este pedido?')) {
      try {
        await dispatch(cancelOrder(orderId)).unwrap();
        toast.success('Pedido cancelado exitosamente');
      } catch (error) {
        toast.error('Error al cancelar el pedido');
      }
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) return <Loading text="Cargando pedidos..." />;

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="mb-4">
            <FaShoppingBag className="me-2" />
            Mis Pedidos
          </h2>
        </Col>
      </Row>

      {/* Summary Cards */}
      {summary && (
        <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-primary">{summary.total_orders}</h3>
                <p className="mb-0 text-muted">Total Pedidos</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-warning">{summary.pending_orders}</h3>
                <p className="mb-0 text-muted">Pendientes</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-info">{summary.processing_orders}</h3>
                <p className="mb-0 text-muted">En Proceso</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-success">{summary.delivered_orders}</h3>
                <p className="mb-0 text-muted">Entregados</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {error && (
        <Alert variant="danger">
          <Alert.Heading>Error al cargar pedidos</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {orders.length === 0 ? (
        <Alert variant="info" className="text-center py-5">
          <FaShoppingBag size={48} className="mb-3 text-muted" />
          <h5>No tienes pedidos aún</h5>
          <p className="mb-3">Cuando realices tu primera compra, aparecerá aquí</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Explorar Productos
          </Button>
        </Alert>
      ) : (
        <Row>
          {orders.map((order) => (
            <Col key={order.id} lg={6} className="mb-4">
              <Card className="h-100">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Pedido #{order.id}</strong>
                    <br />
                    <small className="text-muted">
                      {formatDate(order.created_at)}
                    </small>
                  </div>
                  <Badge bg={getOrderStatusBadge(order.status)}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </Badge>
                </Card.Header>
                
                <Card.Body>
                  <div className="mb-3">
                    <strong>Total: {formatPrice(order.total_amount)}</strong>
                  </div>
                  
                  <div className="mb-3">
                    <small className="text-muted">Productos:</small>
                    {order.items.slice(0, 2).map((item) => (
                      <div key={item.id} className="d-flex justify-content-between">
                        <span>{item.quantity}x {item.product.name}</span>
                        <span>{formatPrice(item.total)}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <small className="text-muted">
                        ...y {order.items.length - 2} más
                      </small>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <small className="text-muted">Dirección:</small>
                    <p className="mb-0 small">{order.shipping_address}</p>
                  </div>
                </Card.Body>
                
                <Card.Footer className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    <FaEye className="me-1" />
                    Ver Detalles
                  </Button>
                  
                  {order.status === 'pending' && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      <FaTimes className="me-1" />
                      Cancelar
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrdersPage;
