import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { UserCheck, UserPlus, Sparkles, ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';

export interface IdentificationStepProps {
  identificationType: 'NEW' | 'EXISTING_ABHA' | 'DEMO';
  abhaIdInput: string;
  onSelectType: (type: 'NEW' | 'EXISTING_ABHA' | 'DEMO') => void;
  onChangeAbhaId: (val: string) => void;
  onSelectDemoPatient: () => void;
  onNext: () => void;
  onBack: () => void;
}

export const IdentificationStep: React.FC<IdentificationStepProps> = ({
  identificationType,
  abhaIdInput,
  onSelectType,
  onChangeAbhaId,
  onSelectDemoPatient,
  onNext,
  onBack,
}) => {
  const [mockVerificationMessage, setMockVerificationMessage] = useState<string | null>(null);

  const handleSimulateAbhaLookup = () => {
    if (!abhaIdInput.trim()) {
      setMockVerificationMessage('Please enter an ABHA ID (e.g. 91-8273-4920-1102).');
      return;
    }
    setMockVerificationMessage('Demo / Prototype Verification: Mock ABHA account found! Profile pre-filled.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>Patient Identification</h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Select how you wish to register or identify yourself today
        </p>
      </div>

      {/* Identification Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Option A: Existing ABHA */}
        <Card 
          onClick={() => onSelectType('EXISTING_ABHA')}
          style={{
            border: identificationType === 'EXISTING_ABHA' ? '3px solid var(--color-primary-700)' : '1px solid var(--color-slate-200)',
            backgroundColor: identificationType === 'EXISTING_ABHA' ? 'var(--color-primary-50)' : '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ background: 'var(--color-primary-100)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <UserCheck size={28} color="var(--color-primary-800)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>Existing Patient (ABHA Health ID)</h3>
                <Badge variant="info">Demo / Prototype Verification</Badge>
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', margin: '0.25rem 0 0.85rem 0' }}>
                Enter your 14-digit ABHA Number or Health Address to fetch existing hospital demographics.
              </p>

              {identificationType === 'EXISTING_ABHA' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. 91-8273-4920-1102"
                      value={abhaIdInput}
                      onChange={(e) => onChangeAbhaId(e.target.value)}
                      style={{
                        flex: 1,
                        minWidth: '220px',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-slate-300)',
                        fontSize: 'var(--font-size-md)',
                      }}
                    />
                    <Button variant="secondary" onClick={handleSimulateAbhaLookup} style={{ minHeight: '44px' }}>
                      Verify Mock ABHA
                    </Button>
                  </div>

                  {mockVerificationMessage && (
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-primary-900)',
                      backgroundColor: 'var(--color-primary-100)',
                      padding: '0.5rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <ShieldAlert size={16} />
                      {mockVerificationMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Option B: New Patient */}
        <Card 
          onClick={() => onSelectType('NEW')}
          style={{
            border: identificationType === 'NEW' ? '3px solid var(--color-primary-700)' : '1px solid var(--color-slate-200)',
            backgroundColor: identificationType === 'NEW' ? 'var(--color-primary-50)' : '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ background: 'var(--color-brand-blue-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
              <UserPlus size={28} color="var(--color-brand-blue-700)" />
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>New Patient Registration</h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                First time visiting this hospital? Enter basic details to create a new kiosk session.
              </p>
            </div>
          </div>
        </Card>

        {/* Option C: Demo Patient Preset */}
        <Card 
          style={{
            backgroundColor: 'var(--color-warning-50)',
            border: '2px dashed var(--color-warning-600)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Sparkles size={24} color="var(--color-warning-700)" />
              <div>
                <strong style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-warning-700)' }}>
                  Fast-Track SIH Demonstration Mode
                </strong>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-warning-700)' }}>
                  Pre-fill sample patient "Rahul Sharma, 46, Male, General Medicine" for quick testing.
                </p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              onClick={onSelectDemoPatient}
              style={{ borderColor: 'var(--color-warning-600)', color: 'var(--color-warning-700)' }}
            >
              Continue as Demo Patient
            </Button>
          </div>
        </Card>

      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant="secondary" icon={<ArrowLeft size={18} />} onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" icon={<ArrowRight size={18} />} onClick={onNext}>
          Continue to Profile
        </Button>
      </div>
    </div>
  );
};
