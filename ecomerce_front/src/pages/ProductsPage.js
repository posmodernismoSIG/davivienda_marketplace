// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Pagination, Alert } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSearchParams } from 'react-router-dom';
// import { fetchProducts, fetchCategories, setFilters } from '../store/slices/productsSlice';
// import ProductList from '../components/products/ProductList';
// import ProductFilters from '../components/products/ProductFilters';

// const ProductsPage = () => {
//   const dispatch = useDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { products, loading, error, pagination, categories } = useSelector((state) => state.products);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     // Obtener filtros desde URL
//     const urlFilters = {
//       search: searchParams.get('search') || '',
//       category: searchParams.get('category') || '',
//       minPrice: searchParams.get('min_price') || '',
//       maxPrice: searchParams.get('max_price') || '',
//       ordering: searchParams.get('ordering') || '-created_at',
//     };
    
//     dispatch(setFilters(urlFilters));
    
//     // Cargar productos con filtros
//     const params = {
//       page: currentPage,
//       ...urlFilters,
//       category__name: urlFilters.category || undefined,
//       min_price: urlFilters.minPrice || undefined,
//       max_price: urlFilters.maxPrice || undefined,
//     };
    
//     // Limpiar parámetros vacíos
//     Object.keys(params).forEach(key => {
//       if (!params[key]) delete params[key];
//     });
    
//     dispatch(fetchProducts(params));
//   }, [dispatch, searchParams, currentPage]);

//   const handleFiltersChange = (newFilters) => {
//     // Actualizar URL con nuevos filtros
//     const params = new URLSearchParams();
    
//     Object.entries(newFilters).forEach(([key, value]) => {
//       if (value) {
//         if (key === 'minPrice') params.set('min_price', value);
//         else if (key === 'maxPrice') params.set('max_price', value);
//         else params.set(key, value);
//       }
//     });
    
//     setSearchParams(params);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Calcular páginas para paginación
//   const totalPages = Math.ceil(pagination.count / 12);
//   const paginationItems = [];
  
//   for (let i = 1; i <= totalPages; i++) {
//     paginationItems.push(
//       <Pagination.Item
//         key={i}
//         active={i === currentPage}
//         onClick={() => handlePageChange(i)}
//       >
//         {i}
//       </Pagination.Item>
//     );
//   }

//   return (
//     <Container className="py-4">
//       <Row>
//         <Col>
//           <h1 className="mb-4">Productos</h1>
          
//           <ProductFilters onFiltersChange={handleFiltersChange} />
          
//           {pagination.count > 0 && (
//             <div className="mb-3">
//               <small className="text-muted">
//                 Mostrando {products.length} de {pagination.count} productos
//               </small>
//             </div>
//           )}
          
//           <ProductList 
//             products={products}
//             loading={loading}
//             error={error}
//           />
          
//           {/* Paginación */}
//           {totalPages > 1 && (
//             <Row className="mt-4">
//               <Col className="d-flex justify-content-center">
//                 <Pagination>
//                   <Pagination.Prev 
//                     disabled={currentPage === 1}
//                     onClick={() => handlePageChange(currentPage - 1)}
//                   />
//                   {paginationItems}
//                   <Pagination.Next 
//                     disabled={currentPage === totalPages}
//                     onClick={() => handlePageChange(currentPage + 1)}
//                   />
//                 </Pagination>
//               </Col>
//             </Row>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ProductsPage;



import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories, setFilters } from '../store/slices/productsSlice';
import ProductList from '../components/products/ProductList';
import ProductFilters from '../components/products/ProductFilters';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error, pagination } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    // Obtener filtros desde URL
    const urlFilters = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('min_price') || '',
      maxPrice: searchParams.get('max_price') || '',
      ordering: searchParams.get('ordering') || '-created_at',
    };
    
    dispatch(setFilters(urlFilters));
    
    // CORRECCIÓN CRÍTICA: Construir parámetros correctamente
    const apiParams = {};
    
    // Paginación
    if (currentPage > 1) {
      apiParams.page = currentPage;
    }
    
    // Búsqueda por texto
    if (urlFilters.search && urlFilters.search.trim()) {
      apiParams.search = urlFilters.search.trim();
    }
    
    // CRÍTICO: Solo usar category__name para filtrar por nombre de categoría
    if (urlFilters.category && urlFilters.category.trim()) {
      apiParams.category__name = urlFilters.category.trim();
    }
    
    // Filtros de precio
    if (urlFilters.minPrice && !isNaN(urlFilters.minPrice)) {
      apiParams.min_price = urlFilters.minPrice;
    }
    
    if (urlFilters.maxPrice && !isNaN(urlFilters.maxPrice)) {
      apiParams.max_price = urlFilters.maxPrice;
    }
    
    // Ordenamiento
    if (urlFilters.ordering) {
      apiParams.ordering = urlFilters.ordering;
    }
    
    console.log('🔍 Parámetros limpiados para API:', apiParams);
    
    dispatch(fetchProducts(apiParams));
  }, [dispatch, searchParams, currentPage]);

  const handleFiltersChange = (newFilters) => {
    console.log('🔧 Nuevos filtros recibidos:', newFilters);
    
    // Actualizar URL con nuevos filtros
    const params = new URLSearchParams();
    
    // Procesar cada filtro
    if (newFilters.search?.trim()) {
      params.set('search', newFilters.search.trim());
    }
    
    if (newFilters.category?.trim()) {
      params.set('category', newFilters.category.trim());
    }
    
    if (newFilters.minPrice && !isNaN(newFilters.minPrice)) {
      params.set('min_price', newFilters.minPrice);
    }
    
    if (newFilters.maxPrice && !isNaN(newFilters.maxPrice)) {
      params.set('max_price', newFilters.maxPrice);
    }
    
    if (newFilters.ordering) {
      params.set('ordering', newFilters.ordering);
    }
    
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular páginas para paginación
  const totalPages = Math.ceil(pagination.count / 12);
  const paginationItems = [];
  
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4">Productos</h1>
          
          <ProductFilters onFiltersChange={handleFiltersChange} />
          
          {pagination.count > 0 && (
            <div className="mb-3">
              <small className="text-muted">
                Mostrando {products.length} de {pagination.count} productos
              </small>
            </div>
          )}
          
          <ProductList 
            products={products}
            loading={loading}
            error={error}
          />
          
          {/* Paginación */}
          {totalPages > 1 && (
            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev 
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                  {paginationItems}
                  <Pagination.Next 
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </Pagination>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsPage;