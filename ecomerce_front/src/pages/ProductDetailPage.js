import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Form, Modal } from 'react-bootstrap';
import { FaStar, FaPlus, FaMinus, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, addProductReview, clearCurrentProduct } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { formatPrice, getImageUrl, formatDate } from '../utils/helpers';
import Loading from '../components/common/Loading';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
    
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (currentProduct) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(currentProduct));
      }
      toast.success(`${quantity} x ${currentProduct.name} agregado al carrito`);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para dejar una reseña');
      navigate('/login');
      return;
    }

    try {
      await dispatch(addProductReview({ 
        productId: currentProduct.id, 
        reviewData 
      })).unwrap();
      
      toast.success('Reseña agregada exitosamente');
      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: '' });
    } catch (error) {
      toast.error('Error al agregar reseña');
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        size={interactive ? 20 : 16}
        className={index < rating ? 'text-warning' : 'text-muted'}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
        onClick={interactive ? () => onRatingChange?.(index + 1) : undefined}
      />
    ));
  };

  if (loading) return <Loading text="Cargando producto..." />;
  
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar el producto</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate('/products')}>
            Volver a productos
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!currentProduct) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Producto no encontrado
        </Alert>
      </Container>
    );
  }

  const isFinancialProduct = currentProduct.category?.name === 'Productos Financieros';

  return (
    <Container className="py-4">
      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Img 
              variant="top" 
              src={getImageUrl(currentProduct.image)}
              alt={currentProduct.name}
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400/f8f9fa/6c757d?text=Imagen+No+Disponible';
              }}
            />
          </Card>
        </Col>

        <Col lg={6}>
          <div className="mb-3">
            <Badge bg={isFinancialProduct ? 'primary' : 'secondary'} className="mb-2">
              {currentProduct.category?.name}
            </Badge>
            <h1 className="fw-bold">{currentProduct.name}</h1>
            
            {currentProduct.average_rating > 0 && (
              <div className="d-flex align-items-center mb-3">
                {renderStars(currentProduct.average_rating)}
                <span className="ms-2 text-muted">
                  ({currentProduct.average_rating.toFixed(1)}) • {currentProduct.reviews?.length || 0} reseñas
                </span>
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="text-primary fw-bold">
              {formatPrice(currentProduct.price)}
              {isFinancialProduct && currentProduct.price > 0 && (
                <small className="text-muted ms-2">
                  {currentProduct.price > 1000000 ? '(Monto base)' : '(Mensual)'}
                </small>
              )}
            </h3>
            
            <div className="mb-3">
              {currentProduct.stock > 0 ? (
                <Badge bg="success">✓ {currentProduct.stock} disponibles</Badge>
              ) : (
                <Badge bg="danger">Sin stock</Badge>
              )}
            </div>
          </div>

          <Card className="mb-4">
            <Card.Body>
              <h5>Descripción</h5>
              <p className="text-muted">{currentProduct.description}</p>
            </Card.Body>
          </Card>

          {!isFinancialProduct && currentProduct.stock > 0 && (
            <Card className="mb-4">
              <Card.Body>
                <h6>Cantidad</h6>
                <div className="d-flex align-items-center mb-3">
                  <Button
                    variant="outline-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <FaMinus />
                  </Button>
                  <span className="mx-3 fw-bold fs-5">{quantity}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}

          <div className="d-grid gap-2 mb-4">
            <Button
              variant="primary"
              size="lg"
              disabled={currentProduct.stock === 0}
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="me-2" />
              {isFinancialProduct ? 'Solicitar Información' : 'Agregar al Carrito'}
            </Button>
            
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" className="flex-fill">
                <FaHeart className="me-2" />
                Favoritos
              </Button>
              <Button variant="outline-secondary" className="flex-fill">
                <FaShare className="me-2" />
                Compartir
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Reseñas y Opiniones</h4>
            <Button 
              variant="outline-primary"
              onClick={() => setShowReviewModal(true)}
              disabled={!isAuthenticated}
            >
              Escribir Reseña
            </Button>
          </div>

          {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
            <Row>
              {currentProduct.reviews.map((review) => (
                <Col key={review.id} md={6} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <strong>{review.user}</strong>
                        <small className="text-muted">
                          {formatDate(review.created_at)}
                        </small>
                      </div>
                      <div className="mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="mb-0">{review.comment}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="info">
              Sé el primero en dejar una reseña para este producto.
            </Alert>
          )}
        </Col>
      </Row>

      {/* Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Escribir Reseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Calificación</Form.Label>
              <div>
                {renderStars(reviewData.rating, true, (rating) => 
                  setReviewData({ ...reviewData, rating })
                )}
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                placeholder="Comparte tu experiencia con este producto..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Publicar Reseña
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetailPage;
