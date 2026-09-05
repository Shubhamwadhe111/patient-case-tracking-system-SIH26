import React from 'react';

export interface BadgeProps {
  variant?: 'success' | 'info' | 'warning' | 'neutral';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  icon,
  children,
}) => {
  return (
    <span className={`badge badge-${variant}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
