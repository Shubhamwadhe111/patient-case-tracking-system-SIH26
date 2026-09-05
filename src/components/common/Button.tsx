import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}) => {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
