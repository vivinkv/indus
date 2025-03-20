import React from 'react';

const LoadingSpinner = ({ heigth, width, color, borderColor }) => {
  return (
    <div className="spinner-container">
      <div style={{ height: heigth || '40px', width: width || '40px', borderTopColor: color || 'white', border: borderColor }} className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
