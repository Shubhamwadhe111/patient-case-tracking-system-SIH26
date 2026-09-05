import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { Badge } from './Badge';
import { APP_CONFIG } from '../../config/appConfig';

export interface StatusBannerProps {
  onOpenRoadmap: () => void;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ onOpenRoadmap }) => {
  const currentPhase = APP_CONFIG.phases.find((p) => p.number === APP_CONFIG.currentPhase);

  return (
    <aside aria-label="System status" className="status-banner">
      <div className="status-banner-content">
        <div className="banner-left">
          <Badge variant="success" icon={<ShieldCheck size={14} />}>
            ACTIVE SYSTEM MODE: PHASE 1 FOUNDATION
          </Badge>
          <span style={{ fontWeight: 500, color: 'var(--color-slate-700)' }}>
            {currentPhase?.name}: {currentPhase?.purpose}
          </span>
        </div>
        <button 
          onClick={onOpenRoadmap} 
          className="btn btn-outline" 
          style={{ minHeight: '36px', height: '36px', padding: '0 0.85rem', fontSize: '0.875rem' }}
        >
          <Info size={16} />
          View 8-Phase Roadmap
        </button>
      </div>
    </aside>
  );
};
