import React from 'react';

const Button = ({ text, onClick, disabled }) => {
  return (
    <button 
      className="btn btn-primary" 
      onClick={onClick} 
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
