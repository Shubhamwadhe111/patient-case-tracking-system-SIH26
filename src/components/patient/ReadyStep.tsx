import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import type { OnboardingData } from '../../types/onboarding';
import { APP_CONFIG } from '../../config/appConfig';
import { CheckCircle2, ShieldCheck, User, Globe, Building2, ArrowRight, RotateCcw } from 'lucide-react';

export interface ReadyStepProps {
  data: OnboardingData;
  onRestart: () => void;
  onStartClinicalHistory?: () => void;
}

export const ReadyStep: React.FC<ReadyStepProps> = ({ data, onRestart, onStartClinicalHistory }) => {
  const [isPhase3ModalOpen, setIsPhase3ModalOpen] = useState(false);

  const langObj = APP_CONFIG.supportedLanguages.find((l) => l.code === data.languageCode);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '750px', margin: '0 auto' }}>
      <Card style={{
        background: 'linear-gradient(135deg, var(--color-success-50) 0%, #ffffff 100%)',
        border: '2px solid var(--color-success-600)',
        padding: '2rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{
            background: 'var(--color-success-600)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CheckCircle2 size={36} color="#ffffff" />
          </div>
        </div>

        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-slate-900)' }}>
          You're Ready!
        </h2>
        <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-success-700)', fontWeight: 600, marginTop: '0.25rem' }}>
          Patient Onboarding Completed Successfully
        </p>

        {/* Onboarding Summary Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-slate-200)',
          padding: '1.25rem',
          margin: '1.5rem 0',
          textAlign: 'left',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              <User size={16} /> PATIENT NAME
            </div>
            <div style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, marginTop: '2px' }}>
              {data.fullName || 'Rahul Sharma'}
            </div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-light)' }}>
              {data.age} Yrs • {data.gender}
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              <Globe size={16} /> SELECTED LANGUAGE
            </div>
            <div style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, marginTop: '2px' }}>
              {langObj ? `${langObj.nativeName} (${langObj.name})` : 'English'}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              <Building2 size={16} /> DEPARTMENT
            </div>
            <div style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, marginTop: '2px' }}>
              {data.departmentName}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} /> CONSENT STATUS
            </div>
            <div style={{ marginTop: '4px' }}>
              <Badge variant="success">Completed & Logged</Badge>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-slate-600)', marginBottom: '1.5rem' }}>
          "Your information is ready for the next step."
        </p>

        {/* Primary Transition Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            icon={<ArrowRight size={20} />}
            onClick={onStartClinicalHistory ? onStartClinicalHistory : () => setIsPhase3ModalOpen(true)}
            style={{
              padding: '0.85rem 2rem',
              fontSize: 'var(--font-size-md)',
              fontWeight: 700,
            }}
          >
            Continue to Clinical History
          </Button>

          <Button
            variant="secondary"
            icon={<RotateCcw size={18} />}
            onClick={onRestart}
          >
            Start New Registration
          </Button>
        </div>
      </Card>

      {/* Clinical Intake Confirmation Modal */}
      <Modal
        isOpen={isPhase3ModalOpen}
        onClose={() => setIsPhase3ModalOpen(false)}
        title="Clinical Intake Session Ready"
        footer={<Button variant="secondary" onClick={() => setIsPhase3ModalOpen(false)}>Return to Registration Summary</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            backgroundColor: 'var(--color-brand-blue-50)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-brand-blue-600)',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start'
          }}>
            <ShieldCheck size={24} color="var(--color-brand-blue-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-slate-900)' }}>
              <strong>Registration Completed</strong>
              <p style={{ marginTop: '0.5rem', lineHeight: 1.5 }}>
                Your registration details have been saved. Click <strong>Continue to Clinical History</strong> to begin answering clinical questions.
              </p>
            </div>
          </div>

          <div style={{ background: 'var(--color-slate-100)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-xs)' }}>
            <strong>Session Patient Profile:</strong>
            <pre style={{ marginTop: '0.5rem', background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-sm)', overflowX: 'auto' }}>
              {JSON.stringify({
                patientName: data.fullName,
                age: data.age,
                gender: data.gender,
                language: data.languageCode,
                department: data.departmentName,
                consentGiven: data.isConsentGiven,
                consentTimestamp: data.consentTimestamp,
              }, null, 2)}
            </pre>
          </div>
        </div>
      </Modal>
    </div>
  );
};
