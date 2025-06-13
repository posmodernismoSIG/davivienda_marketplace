import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>TiendaApp</h5>
            <p className="text-muted">
              Tu tienda online de confianza para productos de calidad y servicios financieros.
            </p>
            <div className="d-flex gap-3">
              <FaFacebook size={20} className="text-muted" />
              <FaTwitter size={20} className="text-muted" />
              <FaInstagram size={20} className="text-muted" />
              <FaLinkedin size={20} className="text-muted" />
            </div>
          </Col>
          
          <Col md={4}>
            <h6>Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li><a href="/products" className="text-muted text-decoration-none">Productos</a></li>
              <li><a href="/about" className="text-muted text-decoration-none">Sobre Nosotros</a></li>
              <li><a href="/contact" className="text-muted text-decoration-none">Contacto</a></li>
              <li><a href="/terms" className="text-muted text-decoration-none">Términos y Condiciones</a></li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h6>Soporte</h6>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-muted text-decoration-none">Centro de Ayuda</a></li>
              <li><a href="/shipping" className="text-muted text-decoration-none">Envíos</a></li>
              <li><a href="/returns" className="text-muted text-decoration-none">Devoluciones</a></li>
              <li><a href="/faq" className="text-muted text-decoration-none">FAQ</a></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col className="text-center">
            <p className="text-muted mb-0">
              © 2024 TiendaApp. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
