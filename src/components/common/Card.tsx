import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style, onClick }) => {
  return (
    <div 
      className={`card ${className}`} 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      {children}
    </div>
  );
};
