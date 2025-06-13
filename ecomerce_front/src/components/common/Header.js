import React from 'react';
import { Navbar, Nav, Container, Badge, Button, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // CAMBIO: Usar Link en lugar de LinkContainer
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { toggleCart, selectCartItemsCount } from '../../store/slices/cartSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItemsCount = useSelector(selectCartItemsCount);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  // Función para manejar navegación programática
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          DaviTienda         </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Productos
            </Nav.Link>
            <NavDropdown title="Categorías" id="categories-dropdown">
              <NavDropdown.Item onClick={() => handleNavigation('/products?category=Electrónicos')}>
                Electrónicos
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation('/products?category=Productos Financieros')}>
                Productos Financieros
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation('/products?category=Ropa')}>
                Ropa
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNavigation('/products?category=Hogar')}>
                Hogar
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="align-items-center">
            {/* Cart Button */}
            <Button 
              variant="outline-light" 
              className="me-3 position-relative"
              onClick={handleCartToggle}
            >
              <FaShoppingCart />
              {cartItemsCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Authentication */}
            {isAuthenticated ? (
              <NavDropdown 
                title={
                  <span>
                    <FaUser className="me-1" />
                    {user?.first_name || user?.username}
                  </span>
                } 
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={() => handleNavigation('/profile')}>
                  Mi Perfil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavigation('/orders')}>
                  Mis Pedidos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={() => handleNavigation('/register')}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;