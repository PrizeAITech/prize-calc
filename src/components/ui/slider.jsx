import React from 'react';

export const Slider = ({ min, max, step, value, onValueChange }) => {
  const handleChange = (e) => {
    onValueChange([Number(e.target.value)]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className="w-full"
    />
  );
};
