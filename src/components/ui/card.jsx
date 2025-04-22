import React from 'react';

export const Card = ({ children, style }) => {
  return (
    <div className="rounded-2xl shadow-md p-4" style={style}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
