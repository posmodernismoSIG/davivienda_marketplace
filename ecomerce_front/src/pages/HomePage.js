import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaArrowRight, FaShieldAlt, FaTruck, FaHeadset } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFeaturedProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/products/ProductCard';
import Loading from '../components/common/Loading';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { featuredProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const features = [
    {
      icon: <FaShieldAlt size={32} className="text-primary" />,
      title: 'Compra Segura',
      description: 'Todas las transacciones están protegidas con la más alta seguridad.'
    },
    {
      icon: <FaTruck size={32} className="text-primary" />,
      title: 'Envío Rápido',
      description: 'Entrega en 24-48 horas en las principales ciudades.'
    },
    {
      icon: <FaHeadset size={32} className="text-primary" />,
      title: 'Soporte 24/7',
      description: 'Nuestro equipo está disponible para ayudarte cuando lo necesites.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="hero-title">
                Descubre la Mejor Tecnología y Servicios Financieros
              </h1>
              <p className="hero-subtitle">
                Encuentra productos de calidad y servicios financieros diseñados para mejorar tu vida.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button 
                  variant="light" 
                  size="lg"
                  onClick={() => navigate('/products')}
                >
                  Explorar Productos
                  <FaArrowRight className="ms-2" />
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={() => navigate('/products?category=Productos Financieros')}
                >
                  Servicios Financieros
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="/logo.png" 
                alt='logo'
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="mb-4">¿Por qué elegirnos?</h2>
            <p className="text-muted lead">
              Ofrecemos la mejor experiencia de compra con productos de calidad y servicios confiables.
            </p>
          </Col>
        </Row>

        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    {feature.icon}
                  </div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Products Section */}
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h2>Productos Destacados</h2>
              <Button 
                variant="outline-primary"
                onClick={() => navigate('/products')}
              >
                Ver todos los productos
                <FaArrowRight className="ms-2" />
              </Button>
            </div>
          </Col>
        </Row>

        {loading ? (
          <Loading text="Cargando productos destacados..." />
        ) : (
          <Row>
            {featuredProducts.slice(0, 8).map((product) => (
              <Col key={product.id} lg={3} md={4} sm={6} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="mb-3">¿Listo para comenzar?</h2>
              <p className="lead mb-4">
                Únete a miles de usuarios satisfechos que ya confían en nosotros.
              </p>
              <Button 
                variant="light" 
                size="lg"
                onClick={() => navigate('/register')}
              >
                Crear Cuenta Gratis
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
