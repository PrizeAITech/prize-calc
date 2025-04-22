import React from 'react';

export const Input = ({ type = "text", value, onChange, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 rounded-md border border-gray-300 ${className}`}
    />
  );
};
