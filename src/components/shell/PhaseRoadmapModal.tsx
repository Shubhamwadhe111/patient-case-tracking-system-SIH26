import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { APP_CONFIG } from '../../config/appConfig';
import type { PhaseInfo } from '../../config/appConfig';
import { 
  CheckCircle2, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles,
  Layers
} from 'lucide-react';

export interface PhaseRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhaseRoadmapModal: React.FC<PhaseRoadmapModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({ 1: true });

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseNumber]: !prev[phaseNumber],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    APP_CONFIG.phases.forEach((p) => {
      all[p.number] = true;
    });
    setExpandedPhases(all);
  };

  const collapseAll = () => {
    setExpandedPhases({ 1: true });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CareConnect Complete 8-Phase Project Roadmap"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
            Current Active Phase: <strong>Phase 1 (Foundation)</strong>
          </span>
          <Button variant="secondary" onClick={onClose}>Close Roadmap</Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Active Phase & Lock Notice Banner */}
        <div style={{
          backgroundColor: 'var(--color-primary-50)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--color-primary-600)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Badge variant="success" icon={<ShieldCheck size={14} />}>
                CURRENT PHASE: PHASE 1 ACTIVE
              </Badge>
              <Badge variant="info" icon={<Lock size={12} />}>
                PHASES 2–8 LOCKED FOR FUTURE DEVELOPMENT
              </Badge>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={expandAll} 
                style={{ background: 'none', border: 'none', color: 'var(--color-primary-700)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Expand All
              </button>
              <span style={{ color: 'var(--color-slate-300)' }}>|</span>
              <button 
                onClick={collapseAll} 
                style={{ background: 'none', border: 'none', color: 'var(--color-primary-700)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Collapse All
              </button>
            </div>
          </div>

          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-900)', lineHeight: 1.5 }}>
            This roadmap documents the complete 8-phase architectural plan for CareConnect. Click any phase to inspect its purpose, main features, and sub-features. Phase 1 foundation is fully implemented; future phases remain locked.
          </p>
        </div>

        {/* Phase Timeline List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {APP_CONFIG.phases.map((phase: PhaseInfo) => {
            const isExpanded = !!expandedPhases[phase.number];
            const isCompleted = phase.status === 'COMPLETED';

            return (
              <div 
                key={phase.number} 
                style={{
                  borderRadius: 'var(--radius-lg)',
                  border: isCompleted 
                    ? '2px solid var(--color-success-600)' 
                    : '1px solid var(--color-slate-200)',
                  backgroundColor: isCompleted ? '#ffffff' : 'var(--color-slate-50)',
                  overflow: 'hidden',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isCompleted ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {/* Expandable Phase Header */}
                <div 
                  onClick={() => togglePhase(phase.number)}
                  style={{
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    backgroundColor: isCompleted ? 'var(--color-success-50)' : 'transparent',
                    borderBottom: isExpanded ? '1px solid var(--color-slate-200)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isCompleted ? (
                        <CheckCircle2 size={24} color="var(--color-success-600)" />
                      ) : (
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: 'var(--color-slate-200)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Lock size={14} color="var(--color-slate-500)" />
                        </div>
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, fontSize: 'var(--font-size-md)', color: isCompleted ? 'var(--color-slate-900)' : 'var(--color-slate-700)' }}>
                          {phase.name}
                        </span>
                        {isCompleted ? (
                          <Badge variant="success">COMPLETED</Badge>
                        ) : (
                          <Badge variant="neutral" icon={<Lock size={10} />}>NOT STARTED</Badge>
                        )}
                      </div>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {phase.purpose}
                      </p>
                    </div>
                  </div>

                  <div style={{ paddingLeft: '0.5rem' }}>
                    {isExpanded ? (
                      <ChevronUp size={20} color="var(--color-slate-600)" />
                    ) : (
                      <ChevronDown size={20} color="var(--color-slate-600)" />
                    )}
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div style={{ padding: '1.25rem', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    {/* Main Features */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-slate-700)', marginBottom: '0.5rem' }}>
                        <Sparkles size={14} color="var(--color-primary-700)" />
                        MAIN FEATURES:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {phase.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            style={{
                              fontSize: 'var(--font-size-xs)',
                              padding: '0.3rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: isCompleted ? 'var(--color-primary-50)' : 'var(--color-slate-100)',
                              color: isCompleted ? 'var(--color-primary-900)' : 'var(--color-slate-700)',
                              fontWeight: 500,
                              border: isCompleted ? '1px solid var(--color-primary-500)' : '1px solid var(--color-slate-300)'
                            }}
                          >
                            • {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sub-Features / Architecture Notes */}
                    {phase.subFeatures && phase.subFeatures.length > 0 && (
                      <div style={{
                        padding: '0.85rem 1rem',
                        backgroundColor: 'var(--color-slate-50)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-slate-200)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-slate-700)', marginBottom: '0.4rem' }}>
                          <Layers size={14} color="var(--color-slate-600)" />
                          ARCHITECTURAL SUB-FEATURES:
                        </div>
                        <ul style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', paddingLeft: '1.2rem' }}>
                          {phase.subFeatures.map((sub, idx) => (
                            <li key={idx} style={{ marginBottom: '2px' }}>{sub}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Lock Status Footer for Future Phases */}
                    {phase.isLocked && (
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-slate-500)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Lock size={12} />
                        Future phases are locked. No implementation code present in Phase 1 build.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
