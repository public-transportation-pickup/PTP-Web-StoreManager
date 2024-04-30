import React from 'react';

const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return formatter.format(number);
  };
  
  const NumberFormat = ({ number }) => <span>{formatNumber(number)}</span>;
  
  export default NumberFormat;