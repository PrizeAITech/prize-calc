import React from 'react';

export function Input({ type, value, onChange, style, className }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={style}
      className={className}
    />
  );
}
