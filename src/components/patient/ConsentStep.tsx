import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { ShieldCheck, Volume2, Info, ArrowRight, ArrowLeft } from 'lucide-react';

export interface ConsentStepProps {
  isConsentGiven: boolean;
  onToggleConsent: (granted: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ConsentStep: React.FC<ConsentStepProps> = ({
  isConsentGiven,
  onToggleConsent,
  onNext,
  onBack,
}) => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [showAudioNotice, setShowAudioNotice] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>Your Consent</h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Please review how your medical information will be processed
        </p>
      </div>

      <Card style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Simple Explanation Box */}
        <div style={{
          backgroundColor: 'var(--color-primary-50)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-primary-600)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-900)', fontWeight: 700 }}>
              <ShieldCheck size={22} color="var(--color-primary-700)" />
              <span>How CareConnect Uses Your Information</span>
            </div>
            
            {/* Audio Help UI Placeholder */}
            <button
              onClick={() => setShowAudioNotice(!showAudioNotice)}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid var(--color-primary-500)',
                borderRadius: 'var(--radius-md)',
                padding: '0.35rem 0.65rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                color: 'var(--color-primary-800)',
                cursor: 'pointer',
              }}
              title="Audio assistant placeholder"
            >
              <Volume2 size={16} />
              <span>Audio Help (Placeholder)</span>
            </button>
          </div>

          {showAudioNotice && (
            <div style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-brand-blue-700)',
              backgroundColor: 'var(--color-brand-blue-50)',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
            }}>
              🔊 Audio narration: Listen to voice guidance for registration and consent instructions.
            </div>
          )}

          <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-slate-800)', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
            <li><strong>What is collected:</strong> Your name, contact details, medical history answers, and uploaded old medical reports.</li>
            <li><strong>Why it is collected:</strong> To prepare a clear, structured health summary for your consulting doctor.</li>
            <li><strong>Privacy Notice:</strong> Your information is treated as sensitive medical data and remains strictly confidential under hospital protocol.</li>
            <li><strong>Doctor Control:</strong> Your doctor remains in full control of your final clinical record.</li>
          </ul>
        </div>

        {/* Required Consent Checkbox */}
        <div style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: isConsentGiven ? '2px solid var(--color-success-600)' : '1px solid var(--color-slate-300)',
          backgroundColor: isConsentGiven ? 'var(--color-success-50)' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          cursor: 'pointer',
        }} onClick={() => onToggleConsent(!isConsentGiven)}>
          <input 
            type="checkbox"
            checked={isConsentGiven}
            onChange={(e) => onToggleConsent(e.target.checked)}
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
          />
          <label style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--color-slate-900)', cursor: 'pointer' }}>
            I understand and consent to the use of my information for this consultation. *
          </label>
        </div>

        {/* Privacy Information Modal Trigger */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button 
            onClick={() => setIsPrivacyModalOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-brand-blue-600)',
              fontWeight: 600,
              fontSize: 'var(--font-size-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            <Info size={16} />
            View Privacy Information
          </button>
        </div>

      </Card>

      {/* Privacy Information Modal */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="CareConnect Patient Privacy Policy"
        footer={<Button variant="secondary" onClick={() => setIsPrivacyModalOpen(false)}>Close Privacy Terms</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
          <p>
            CareConnect respects your fundamental right to medical data privacy. Information captured during this kiosk onboarding session is governed under hospital confidentiality standards and India's Digital Personal Data Protection (DPDP) guidelines.
          </p>
          <div style={{ background: 'var(--color-slate-100)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <strong>Key Protection Guarantees:</strong>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
              <li>Data is processed solely for preparing your outpatient consultation summary.</li>
              <li>Data is shared strictly with authorized medical professionals in your assigned department.</li>
              <li>You may request session data deletion via hospital administration.</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant="secondary" icon={<ArrowLeft size={18} />} onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="primary" 
          icon={<ArrowRight size={18} />} 
          onClick={onNext}
          disabled={!isConsentGiven}
          style={{ opacity: isConsentGiven ? 1 : 0.5, cursor: isConsentGiven ? 'pointer' : 'not-allowed' }}
        >
          Continue to Department
        </Button>
      </div>
    </div>
  );
};
