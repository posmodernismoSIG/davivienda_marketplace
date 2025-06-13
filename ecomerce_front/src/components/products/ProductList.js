// import React from 'react';
// import { Row, Col, Alert } from 'react-bootstrap';
// import ProductCard from './ProductCard';
// import Loading from '../common/Loading';

// const ProductList = ({ products, loading, error }) => {
//   if (loading) {
//     return <Loading text="Cargando productos..." />;
//   }

//   if (error) {
//     return (
//       <Alert variant="danger">
//         <Alert.Heading>Error al cargar productos</Alert.Heading>
//         <p>{error}</p>
//       </Alert>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <Alert variant="info" className="text-center py-5">
//         <h5>No se encontraron productos</h5>
//         <p className="mb-0">
//           Intenta ajustar los filtros de búsqueda para encontrar lo que buscas.
//         </p>
//       </Alert>
//     );
//   }

//   return (
//     <Row>
//       {products.map((product) => (
//         <Col key={product.id} lg={3} md={4} sm={6} className="mb-4">
//           <ProductCard product={product} />
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default ProductList;

import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';

const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return <Loading text="Cargando productos..." />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error al cargar productos</Alert.Heading>
        <p>{typeof error === 'string' ? error : 'Ha ocurrido un error inesperado'}</p>
      </Alert>
    );
  }

  // VALIDACIÓN: Verificar que products sea un array
  if (!Array.isArray(products)) {
    return (
      <Alert variant="warning" className="text-center py-5">
        <h5>Error en los datos</h5>
        <p className="mb-0">
          Los datos de productos no están en el formato esperado.
        </p>
      </Alert>
    );
  }

  if (products.length === 0) {
    return (
      <Alert variant="info" className="text-center py-5">
        <h5>No se encontraron productos</h5>
        <p className="mb-0">
          Intenta ajustar los filtros de búsqueda para encontrar lo que buscas.
        </p>
      </Alert>
    );
  }

  return (
    <Row>
      {products.map((product, index) => (
        <Col key={product?.id || index} lg={3} md={4} sm={6} className="mb-4">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;