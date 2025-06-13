// import React from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addToCart } from '../../store/slices/cartSlice';
// import { formatPrice, getImageUrl, truncateText } from '../../utils/helpers';
// import { toast } from 'react-toastify';

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     dispatch(addToCart(product));
//     toast.success(`${product.name} agregado al carrito`);
//   };

//   const handleViewDetails = () => {
//     navigate(`/products/${product.id}`);
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <FaStar
//         key={index}
//         size={14}
//         className={index < Math.floor(rating) ? 'text-warning' : 'text-muted'}
//       />
//     ));
//   };

//   const isFinancialProduct = product.category?.name === 'Productos Financieros';

//   return (
//     <Card 
//       className={`product-card h-100 ${isFinancialProduct ? 'financial-product' : ''}`}
//       onClick={handleViewDetails}
//       style={{ cursor: 'pointer' }}
//     >
//       <div className="position-relative">
//         <Card.Img
//           variant="top"
//           src={getImageUrl(product.image)}
//           alt={product.name}
//           className="product-image"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/300x250/f8f9fa/6c757d?text=Imagen+No+Disponible';
//           }}
//         />
        
//         <div className="position-absolute top-0 end-0 m-2">
//           {product.stock > 0 ? (
//             <Badge bg="success">{product.stock} disponibles</Badge>
//           ) : (
//             <Badge bg="danger">Sin stock</Badge>
//           )}
//         </div>
        
//         {isFinancialProduct && (
//           <div className="position-absolute top-0 start-0 m-2">
//             <Badge bg="primary">💰 Financiero</Badge>
//           </div>
//         )}
//       </div>

//       <Card.Body className="d-flex flex-column">
//         <Card.Title className="product-title">
//           {truncateText(product.name, 60)}
//         </Card.Title>
        
//         <Card.Text className="text-muted flex-grow-1 small">
//           {truncateText(product.description, 100)}
//         </Card.Text>

//         {product.average_rating > 0 && (
//           <div className="product-rating mb-2">
//             {renderStars(product.average_rating)}
//             <span className="ms-2 small text-muted">
//               ({product.average_rating.toFixed(1)})
//             </span>
//           </div>
//         )}

//         <div className="d-flex justify-content-between align-items-center mt-auto">
//           <div>
//             <div className="product-price">
//               {formatPrice(product.price)}
//             </div>
//             {isFinancialProduct && (
//               <small className="text-muted">
//                 {product.price === 0 ? 'Gratuito' : 
//                  product.price > 1000000 ? 'Desde' : 'Mensual'}
//               </small>
//             )}
//           </div>
          
//           <div className="d-flex gap-2">
//             <Button 
//               variant="outline-primary" 
//               size="sm"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails();
//               }}
//             >
//               <FaEye />
//             </Button>
            
//             <Button 
//               variant="primary" 
//               size="sm"
//               disabled={product.stock === 0}
//               onClick={handleAddToCart}
//             >
//               <FaShoppingCart />
//             </Button>
//           </div>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductCard;
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import { formatPrice, getImageUrl, truncateText } from '../../utils/helpers';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // VALIDACIÓN: Verificar que el producto existe
  if (!product) {
    return (
      <Card className="product-card h-100">
        <Card.Body className="d-flex justify-content-center align-items-center">
          <div className="text-muted">Producto no disponible</div>
        </Card.Body>
      </Card>
    );
  }

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name || 'Producto'} agregado al carrito`);
  };

  const handleViewDetails = () => {
    if (product.id) {
      navigate(`/products/${product.id}`);
    }
  };

  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0;
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        size={14}
        className={index < Math.floor(numericRating) ? 'text-warning' : 'text-muted'}
      />
    ));
  };

  // VALIDACIONES SEGURAS para los datos del producto
  const productName = product.name || 'Producto sin nombre';
  const productDescription = product.description || 'Descripción no disponible';
  const productPrice = product.price || 0;
  const productStock = product.stock || 0;
  const productRating = product.average_rating || 0;
  const productCategory = product.category?.name || '';
  const isFinancialProduct = productCategory === 'Productos Financieros';

  return (
    <Card 
      className={`product-card h-100 ${isFinancialProduct ? 'financial-product' : ''}`}
      onClick={handleViewDetails}
      style={{ cursor: 'pointer' }}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={getImageUrl(product.image)}
          alt={productName}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x250/f8f9fa/6c757d?text=Imagen+No+Disponible';
          }}
        />
        
        <div className="position-absolute top-0 end-0 m-2">
          {productStock > 0 ? (
            <Badge bg="success">{productStock} disponibles</Badge>
          ) : (
            <Badge bg="danger">Sin stock</Badge>
          )}
        </div>
        
        {isFinancialProduct && (
          <div className="position-absolute top-0 start-0 m-2">
            <Badge bg="primary">💰 Financiero</Badge>
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-title">
          {truncateText(productName, 60)}
        </Card.Title>
        
        <Card.Text className="text-muted flex-grow-1 small">
          {truncateText(productDescription, 100)}
        </Card.Text>

        {productRating > 0 && (
          <div className="product-rating mb-2">
            {renderStars(productRating)}
            <span className="ms-2 small text-muted">
              ({productRating.toFixed(1)})
            </span>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <div className="product-price">
              {formatPrice(productPrice)}
            </div>
            {isFinancialProduct && (
              <small className="text-muted">
                {productPrice === 0 ? 'Gratuito' : 
                 productPrice > 1000000 ? 'Desde' : 'Mensual'}
              </small>
            )}
          </div>
          
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <FaEye />
            </Button>
            
            <Button 
              variant="primary" 
              size="sm"
              disabled={productStock === 0}
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;