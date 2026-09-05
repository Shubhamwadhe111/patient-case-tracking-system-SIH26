import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { HeartPulse, Clock, ArrowRight, ArrowLeft, ShieldCheck, HelpCircle, RotateCcw, BookmarkCheck } from 'lucide-react';
import type { OnboardingData } from '../../types/onboarding';
import { clinicalHistorySessionService } from '../../services/clinicalHistorySessionService';
import type { ClinicalHistorySession } from '../../types/clinicalHistory';

export interface ClinicalHistoryIntroStepProps {
  patientData: OnboardingData;
  onStart: (resumeQuestionIndex?: number) => void;
  onBack: () => void;
}

export const ClinicalHistoryIntroStep: React.FC<ClinicalHistoryIntroStepProps> = ({
  patientData,
  onStart,
  onBack,
}) => {
  const [existingSession, setExistingSession] = useState<ClinicalHistorySession | null>(null);

  useEffect(() => {
    const session = clinicalHistorySessionService.getIncompleteSession(patientData.fullName || 'default_patient');
    setExistingSession(session);
  }, [patientData.fullName]);

  const handleStartFresh = () => {
    clinicalHistorySessionService.clearSession(patientData.fullName || 'default_patient');
    setExistingSession(null);
    onStart(0);
  };

  const handleResume = () => {
    const resumeIdx = existingSession ? existingSession.currentQuestionIndex : 0;
    onStart(resumeIdx);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '750px', margin: '0 auto' }}>
      <Card style={{
        padding: '2.5rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
        border: '2px solid var(--color-brand-teal-500)',
        boxShadow: 'var(--shadow-md)',
      }}>
        {/* Icon & Step Header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            background: 'var(--color-brand-teal-600)',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)',
          }}>
            <HeartPulse size={40} color="#ffffff" />
          </div>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Badge variant="info" icon={<ShieldCheck size={14} />}>
            Clinical History • Step 1 of 7
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-slate-900)' }}>
          Let's Talk About Your Health
        </h1>

        {/* Patient Greeting */}
        <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-brand-teal-700)', fontWeight: 600, marginTop: '0.5rem' }}>
          Welcome, {patientData.fullName || 'Patient'}!
        </p>

        {/* Informational Text */}
        <p style={{
          fontSize: 'var(--font-size-md)',
          color: 'var(--color-slate-700)',
          marginTop: '1rem',
          lineHeight: 1.6,
          maxWidth: '580px',
          margin: '1rem auto 0 auto',
        }}>
          I'll ask you a few questions about your health. Your answers will help prepare your information for the doctor.
        </p>

        {/* Incomplete Session Resume Banner */}
        {existingSession && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            backgroundColor: '#f0f9ff',
            borderRadius: 'var(--radius-md)',
            border: '2px solid #0284c7',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0369a1', fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
              <BookmarkCheck size={20} color="#0284c7" />
              <span>Ongoing Session Found</span>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-slate-700)', lineHeight: 1.4 }}>
              You have an unfinished session with <strong>{existingSession.responses.length}</strong> answer(s) saved. You can resume where you left off at Question {existingSession.currentQuestionIndex + 1} of {existingSession.totalQuestions}.
            </p>
          </div>
        )}

        {/* Metadata & Time Estimate Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1.5rem',
          backgroundColor: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-slate-200)',
          width: 'fit-content',
          margin: '1.5rem auto 0 auto',
          color: 'var(--color-slate-600)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 500,
        }}>
          <Clock size={18} color="var(--color-brand-teal-600)" />
          <span>Estimated time: a few minutes</span>
        </div>

        {/* Safety Disclaimer Banner */}
        <div style={{
          marginTop: '1.75rem',
          padding: '1rem',
          backgroundColor: 'var(--color-slate-50)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-slate-200)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-muted)',
          textAlign: 'left',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
        }}>
          <HelpCircle size={18} color="var(--color-brand-teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Information Collection Notice:</strong>
            <p style={{ marginTop: '0.25rem', lineHeight: 1.4 }}>
              This system collects your symptom details for your consulting physician. It does not provide medical diagnosis, treatment advice, or make clinical decisions.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Button
            variant="secondary"
            icon={<ArrowLeft size={20} />}
            onClick={onBack}
            style={{ minHeight: '52px', padding: '0 1.5rem', fontSize: 'var(--font-size-md)' }}
          >
            Back
          </Button>

          {existingSession ? (
            <>
              <Button
                variant="secondary"
                icon={<RotateCcw size={18} />}
                onClick={handleStartFresh}
                style={{ minHeight: '52px', padding: '0 1.25rem', fontSize: 'var(--font-size-md)' }}
              >
                Start Fresh
              </Button>

              <Button
                variant="primary"
                icon={<ArrowRight size={22} />}
                onClick={handleResume}
                style={{
                  minHeight: '52px',
                  padding: '0 2rem',
                  fontSize: 'var(--font-size-md)',
                  fontWeight: 700,
                }}
              >
                Resume Session (Q{existingSession.currentQuestionIndex + 1})
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              icon={<ArrowRight size={22} />}
              onClick={() => onStart(0)}
              style={{
                minHeight: '52px',
                padding: '0 2.5rem',
                fontSize: 'var(--font-size-md)',
                fontWeight: 700,
              }}
            >
              Start
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
