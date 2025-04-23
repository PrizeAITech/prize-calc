import React from 'react';

export function CardContent({ children, style }) {
  return (
    <div className="card-content" style={style}>
      {children}
    </div>
  );
}
