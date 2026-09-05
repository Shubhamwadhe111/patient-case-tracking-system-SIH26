import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { APP_CONFIG } from '../../config/appConfig';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

export interface LanguageStepProps {
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LanguageStep: React.FC<LanguageStepProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onNext,
  onBack,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-slate-900)' }}>
          Choose Your Language / अपनी भाषा चुनें
        </h2>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Select the language you prefer for your kiosk interaction
        </p>
      </div>

      {/* Language Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '1rem',
      }}>
        {APP_CONFIG.supportedLanguages.map((lang) => {
          const isSelected = lang.code === selectedLanguage;

          return (
            <Card
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              style={{
                textAlign: 'center',
                padding: '1.25rem 1rem',
                border: isSelected 
                  ? '3px solid var(--color-primary-700)' 
                  : '1px solid var(--color-slate-200)',
                backgroundColor: isSelected ? 'var(--color-primary-50)' : '#ffffff',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                minHeight: '100px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: isSelected ? 'var(--color-primary-900)' : 'var(--color-slate-800)' }}>
                  {lang.nativeName}
                </span>
                {isSelected && (
                  <div style={{ background: 'var(--color-primary-700)', borderRadius: '50%', padding: '2px', display: 'flex' }}>
                    <Check size={14} color="#ffffff" />
                  </div>
                )}
              </div>
              <span style={{ fontSize: 'var(--font-size-xs)', color: isSelected ? 'var(--color-primary-700)' : 'var(--text-muted)', fontWeight: 500 }}>
                {lang.name}
              </span>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <Button variant="secondary" icon={<ArrowLeft size={18} />} onClick={onBack}>
          Back
        </Button>
        <Button variant="primary" icon={<ArrowRight size={18} />} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};
