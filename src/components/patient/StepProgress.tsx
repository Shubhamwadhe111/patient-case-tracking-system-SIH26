import React from 'react';
import type { OnboardingStep } from '../../types/onboarding';
import { Check } from 'lucide-react';

export interface StepProgressProps {
  currentStep: OnboardingStep;
}

const STEPS: Array<{ key: OnboardingStep; label: string; num: string }> = [
  { key: 'LANGUAGE', label: 'Language', num: '01' },
  { key: 'IDENTIFICATION', label: 'ID Check', num: '02' },
  { key: 'PROFILE', label: 'Profile', num: '03' },
  { key: 'CONSENT', label: 'Consent', num: '04' },
  { key: 'DEPARTMENT', label: 'Department', num: '05' },
  { key: 'READY', label: 'Ready', num: '06' },
  { key: 'CLINICAL_HISTORY_INTRO', label: 'History', num: '07' },
];

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep }) => {
  if (currentStep === 'WELCOME') return null;

  let currentIdx = STEPS.findIndex((s) => s.key === currentStep);
  if (currentStep === 'CLINICAL_HISTORY_CONVERSATION') {
    currentIdx = 6;
  }

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--color-slate-200)',
      borderRadius: 'var(--radius-lg)',
      padding: '0.85rem 1.25rem',
      marginBottom: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`,
        gap: '0.5rem',
        alignItems: 'center'
      }}>
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isActive = idx === currentIdx;

          return (
            <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                backgroundColor: isCompleted 
                  ? 'var(--color-success-600)' 
                  : isActive 
                    ? 'var(--color-primary-700)' 
                    : 'var(--color-slate-200)',
                color: isCompleted || isActive ? '#ffffff' : 'var(--color-slate-600)',
                transition: 'all var(--transition-fast)',
              }}>
                {isCompleted ? <Check size={16} /> : step.num}
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-primary-900)' : 'var(--color-slate-600)',
                textAlign: 'center',
                display: 'none',
              }} className="step-label-desktop">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
