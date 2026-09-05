import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Stethoscope, HeartPulse, Building2, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export interface DepartmentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface DepartmentStepProps {
  selectedDepartmentId: string;
  onSelectDepartment: (id: string, name: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEPARTMENTS: DepartmentOption[] = [
  {
    id: 'gen-med',
    name: 'General Medicine',
    description: 'Fever, blood pressure, diabetes, chest/abdominal discomfort, internal medicine OPD.',
    icon: <Stethoscope size={32} color="var(--color-primary-700)" />,
  },
  {
    id: 'ayush',
    name: 'AYUSH / Ayurveda',
    description: 'Traditional Ayurveda consultations, wellness, lifestyle, Panchakarma OPD.',
    icon: <HeartPulse size={32} color="var(--color-brand-blue-700)" />,
  },
  {
    id: 'general-opd',
    name: 'Other / General OPD',
    description: 'ENT, Orthopedics, Ophthalmology, Skin/Dermatology general walk-in triage.',
    icon: <Building2 size={32} color="var(--color-success-700)" />,
  },
];

export const DepartmentStep: React.FC<DepartmentStepProps> = ({
  selectedDepartmentId,
  onSelectDepartment,
  onNext,
  onBack,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>Choose Your Department</h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Select the OPD clinic department you are visiting today
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {DEPARTMENTS.map((dept) => {
          const isSelected = dept.id === selectedDepartmentId;

          return (
            <Card
              key={dept.id}
              onClick={() => onSelectDepartment(dept.id, dept.name)}
              style={{
                padding: '1.5rem',
                border: isSelected ? '3px solid var(--color-primary-700)' : '1px solid var(--color-slate-200)',
                backgroundColor: isSelected ? 'var(--color-primary-50)' : '#ffffff',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  background: isSelected ? '#ffffff' : 'var(--color-slate-100)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                }}>
                  {dept.icon}
                </div>
                {isSelected && (
                  <div style={{ background: 'var(--color-primary-700)', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                    <Check size={16} color="#ffffff" />
                  </div>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-slate-900)' }}>
                  {dept.name}
                </h3>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                  {dept.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant="secondary" icon={<ArrowLeft size={18} />} onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" icon={<ArrowRight size={18} />} onClick={onNext}>
          Complete Onboarding
        </Button>
      </div>
    </div>
  );
};
