import React from 'react';

export function Slider({ min, max, step, value, onValueChange }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
      className="slider"
    />
  );
}
