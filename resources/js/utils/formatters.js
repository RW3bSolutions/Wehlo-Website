// utils/formatters.js

export function formatPeso(value, options = {}) {
    const defaultOptions = {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
  
    return new Intl.NumberFormat('en-PH', { ...defaultOptions, ...options }).format(value);
  }
  