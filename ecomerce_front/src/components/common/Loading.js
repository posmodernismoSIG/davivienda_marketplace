import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({ size = 'md', text = 'Cargando...' }) => {
  const spinnerSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  
  return (
    <div className="loading-container">
      <div className="text-center">
        <Spinner 
          animation="border" 
          variant="primary" 
          size={spinnerSize}
          className="mb-2"
        />
        <div className="text-muted">{text}</div>
      </div>
    </div>
  );
};

export default Loading;