import React from 'react';
import { HeartPulse } from 'lucide-react';

export interface CareConnectLogoProps {
  size?: number;
  iconBg?: string;
  iconColor?: string;
  showText?: boolean;
  textColor?: string;
  subtitleColor?: string;
  className?: string;
  onClick?: () => void;
}

export const CareConnectLogo: React.FC<CareConnectLogoProps> = ({
  size = 22,
  iconBg = '#006565',
  iconColor = '#ffffff',
  showText = true,
  textColor = '#111c2d',
  subtitleColor = '#006565',
  className = '',
  onClick,
}) => {
  return (
    <div 
      className={`careconnect-logo ${className}`}
      onClick={onClick}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      {/* Emblem SVG Icon combining HeartPulse medical node symbol */}
      <div style={{
        backgroundColor: iconBg,
        color: iconColor,
        width: `${size + 16}px`,
        height: `${size + 16}px`,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0, 101, 101, 0.18)',
        flexShrink: 0,
      }}>
        <HeartPulse size={size} color={iconColor} strokeWidth={2.3} />
      </div>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: textColor, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            CareConnect
          </span>
          <span style={{ fontSize: '0.68rem', color: subtitleColor, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '1px' }}>
            Healthcare Platform
          </span>
        </div>
      )}
    </div>
  );
};

export default CareConnectLogo;
