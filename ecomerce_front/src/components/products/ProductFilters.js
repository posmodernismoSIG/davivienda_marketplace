// import React, { useState, useEffect } from 'react';
// import { Row, Col, Form, Button, Card } from 'react-bootstrap';
// import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFilters, clearFilters } from '../../store/slices/productsSlice';

// const ProductFilters = ({ onFiltersChange }) => {
//   const dispatch = useDispatch();
//   const { categories } = useSelector((state) => state.products);
//   const { filters } = useSelector((state) => state.products);
  
//   const [localFilters, setLocalFilters] = useState(filters);

//   useEffect(() => {
//     setLocalFilters(filters);
//   }, [filters]);

//   const handleFilterChange = (field, value) => {
//     const newFilters = { ...localFilters, [field]: value };
//     setLocalFilters(newFilters);
//     dispatch(setFilters(newFilters));
//     if (onFiltersChange) {
//       onFiltersChange(newFilters);
//     }
//   };

//   const handleClearFilters = () => {
//     dispatch(clearFilters());
//     setLocalFilters({
//       search: '',
//       category: '',
//       minPrice: '',
//       maxPrice: '',
//       ordering: '-created_at',
//     });
//     if (onFiltersChange) {
//       onFiltersChange({
//         search: '',
//         category: '',
//         minPrice: '',
//         maxPrice: '',
//         ordering: '-created_at',
//       });
//     }
//   };

//   const hasActiveFilters = localFilters.search || localFilters.category || 
//                           localFilters.minPrice || localFilters.maxPrice;

//   return (
//     <Card className="filters-container mb-4">
//       <Card.Body>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h6 className="mb-0">
//             <FaFilter className="me-2" />
//             Filtros
//           </h6>
//           {hasActiveFilters && (
//             <Button 
//               variant="outline-secondary" 
//               size="sm"
//               onClick={handleClearFilters}
//             >
//               <FaTimes className="me-1" />
//               Limpiar
//             </Button>
//           )}
//         </div>

//         <Row>
//           <Col md={4}>
//             <Form.Group className="mb-3">
//               <Form.Label>Buscar</Form.Label>
//               <div className="position-relative">
//                 <Form.Control
//                   type="text"
//                   placeholder="Buscar productos..."
//                   value={localFilters.search}
//                   onChange={(e) => handleFilterChange('search', e.target.value)}
//                 />
//                 <FaSearch 
//                   className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
//                 />
//               </div>
//             </Form.Group>
//           </Col>

//           <Col md={3}>
//             <Form.Group className="mb-3">
//               <Form.Label>Categoría</Form.Label>
//               <Form.Select
//                 value={localFilters.category}
//                 onChange={(e) => handleFilterChange('category', e.target.value)}
//               >
//                 <option value="">Todas las categorías</option>
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.name}>
//                     {category.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group className="mb-3">
//               <Form.Label>Precio mínimo</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="$0"
//                 value={localFilters.minPrice}
//                 onChange={(e) => handleFilterChange('minPrice', e.target.value)}
//               />
//             </Form.Group>
//           </Col>

//           <Col md={2}>
//             <Form.Group className="mb-3">
//               <Form.Label>Precio máximo</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="$999999"
//                 value={localFilters.maxPrice}
//                 onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//               />
//             </Form.Group>
//           </Col>

//           <Col md={1}>
//             <Form.Group className="mb-3">
//               <Form.Label>Ordenar</Form.Label>
//               <Form.Select
//                 value={localFilters.ordering}
//                 onChange={(e) => handleFilterChange('ordering', e.target.value)}
//               >
//                 <option value="-created_at">Más recientes</option>
//                 <option value="price">Precio menor</option>
//                 <option value="-price">Precio mayor</option>
//                 <option value="name">Nombre A-Z</option>
//                 <option value="-name">Nombre Z-A</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductFilters;

import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../../store/slices/productsSlice';

const ProductFilters = ({ onFiltersChange }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);
  const { filters } = useSelector((state) => state.products);
  
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
    
    // CRÍTICO: Enviar inmediatamente los filtros
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      ordering: '-created_at',
    };
    
    setLocalFilters(emptyFilters);
    dispatch(clearFilters());
    
    if (onFiltersChange) {
      onFiltersChange(emptyFilters);
    }
  };

  const hasActiveFilters = localFilters.search || localFilters.category || 
                          localFilters.minPrice || localFilters.maxPrice;

  return (
    <Card className="filters-container mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">
            <FaFilter className="me-2" />
            Filtros
          </h6>
          {hasActiveFilters && (
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={handleClearFilters}
            >
              <FaTimes className="me-1" />
              Limpiar
            </Button>
          )}
        </div>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Buscar</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Buscar productos..."
                  value={localFilters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                <FaSearch 
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Precio mínimo</Form.Label>
              <Form.Control
                type="number"
                placeholder="$0"
                value={localFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Precio máximo</Form.Label>
              <Form.Control
                type="number"
                placeholder="$999999"
                value={localFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={1}>
            <Form.Group className="mb-3">
              <Form.Label>Ordenar</Form.Label>
              <Form.Select
                value={localFilters.ordering}
                onChange={(e) => handleFilterChange('ordering', e.target.value)}
              >
                <option value="-created_at">Más recientes</option>
                <option value="price">Precio menor</option>
                <option value="-price">Precio mayor</option>
                <option value="name">Nombre A-Z</option>
                <option value="-name">Nombre Z-A</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductFilters;
