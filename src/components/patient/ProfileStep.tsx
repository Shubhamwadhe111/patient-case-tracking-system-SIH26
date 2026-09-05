import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import type { OnboardingData } from '../../types/onboarding';
import type { Gender } from '../../types/patient';
import { APP_CONFIG } from '../../config/appConfig';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export interface ProfileStepProps {
  data: OnboardingData;
  onChangeData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProfileStep: React.FC<ProfileStepProps> = ({
  data,
  onChangeData,
  onNext,
  onBack,
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleValidateAndNext = () => {
    if (!data.fullName.trim()) {
      setErrorMsg('Please enter your Full Name.');
      return;
    }
    if (!data.age.trim() || isNaN(Number(data.age)) || Number(data.age) <= 0 || Number(data.age) > 120) {
      setErrorMsg('Please enter a valid age (1 - 120).');
      return;
    }
    if (!data.phone.trim() || data.phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg(null);
    onNext();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>Patient Profile</h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Please verify or complete your basic personal details
        </p>
      </div>

      <Card style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {errorMsg && (
          <div style={{
            backgroundColor: 'var(--color-danger-50)',
            color: 'var(--color-danger-700)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-danger-600)',
            fontSize: 'var(--font-size-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <AlertCircle size={18} />
            {errorMsg}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 'var(--font-size-sm)', marginBottom: '0.4rem' }}>
            Full Name *
          </label>
          <input 
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={data.fullName}
            onChange={(e) => onChangeData({ fullName: e.target.value })}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-slate-300)',
              fontSize: 'var(--font-size-md)',
            }}
          />
        </div>

        {/* Age & Gender Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: 'var(--font-size-sm)', marginBottom: '0.4rem' }}>
              Age (Years) *
            </label>
            <input 
              type="number"
              placeholder="e.g. 46"
              value={data.age}
              onChange={(e) => onChangeData({ age: e.target.value })}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-slate-300)',
                fontSize: 'var(--font-size-md)',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: 'var(--font-size-sm)', marginBottom: '0.4rem' }}>
              Gender *
            </label>
            <select
              value={data.gender}
              onChange={(e) => onChangeData({ gender: e.target.value as Gender })}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-slate-300)',
                fontSize: 'var(--font-size-md)',
                backgroundColor: '#ffffff',
              }}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
              <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Mobile Number & ABHA ID Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: 'var(--font-size-sm)', marginBottom: '0.4rem' }}>
              Mobile Number *
            </label>
            <input 
              type="tel"
              placeholder="e.g. 9876543210"
              value={data.phone}
              onChange={(e) => onChangeData({ phone: e.target.value })}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-slate-300)',
                fontSize: 'var(--font-size-md)',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: 'var(--font-size-sm)', marginBottom: '0.4rem' }}>
              ABHA ID (Optional)
            </label>
            <input 
              type="text"
              placeholder="e.g. 91-8273-4920-1102"
              value={data.abhaIdInput || ''}
              onChange={(e) => onChangeData({ abhaIdInput: e.target.value })}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-slate-300)',
                fontSize: 'var(--font-size-md)',
              }}
            />
          </div>
        </div>

        {/* Preferred Language */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 'var(--font-size-sm)', marginBottom: '0.4rem' }}>
            Preferred Kiosk Language
          </label>
          <select
            value={data.languageCode}
            onChange={(e) => onChangeData({ languageCode: e.target.value })}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-slate-300)',
              fontSize: 'var(--font-size-md)',
              backgroundColor: '#ffffff',
            }}
          >
            {APP_CONFIG.supportedLanguages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.nativeName} ({l.name})
              </option>
            ))}
          </select>
        </div>

      </Card>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant="secondary" icon={<ArrowLeft size={18} />} onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" icon={<ArrowRight size={18} />} onClick={handleValidateAndNext}>
          Continue to Consent
        </Button>
      </div>
    </div>
  );
};
