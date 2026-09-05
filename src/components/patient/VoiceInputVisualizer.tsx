import React from 'react';
import { 
  Mic, 
  MicOff, 
  Loader2, 
  AlertCircle, 
  Square, 
  Volume2, 
  RotateCcw,
  Info
} from 'lucide-react';
import type { VoiceInputState } from '../../types/clinicalHistory';

export interface VoiceInputVisualizerProps {
  voiceState: VoiceInputState;
  errorMessage?: string | null;
  onStopListening: () => void;
  onStartListening: () => void;
  onResetState: () => void;
}

export const VoiceInputVisualizer: React.FC<VoiceInputVisualizerProps> = ({
  voiceState,
  errorMessage,
  onStopListening,
  onStartListening,
  onResetState,
}) => {
  if (voiceState === 'idle') {
    return null;
  }

  return (
    <div style={{
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      transition: 'all 0.3s ease',
      marginBottom: '1rem',
      backgroundColor: voiceState === 'listening' 
        ? '#ecfeff' 
        : voiceState === 'preparing' 
        ? '#f0fdfa' 
        : voiceState === 'stopped' 
        ? '#f8fafc' 
        : voiceState === 'unsupported'
        ? '#fffbe6'
        : '#fef2f2',
      border: voiceState === 'listening' 
        ? '2px solid var(--color-brand-teal-500)' 
        : voiceState === 'preparing' 
        ? '1px dashed var(--color-brand-teal-400)' 
        : voiceState === 'stopped' 
        ? '1px solid var(--color-slate-300)' 
        : voiceState === 'unsupported'
        ? '1px solid #ffe58f'
        : '1px solid #fca5a5',
      boxShadow: voiceState === 'listening' ? '0 4px 12px rgba(6, 182, 212, 0.15)' : 'none',
    }}>
      
      {/* 1. PREPARING STATE */}
      {voiceState === 'preparing' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-brand-teal-600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Loader2 size={20} color="#ffffff" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-brand-teal-900)' }}>
              Connecting Microphone...
            </h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand-teal-700)', marginTop: '2px' }}>
              Requesting speech recognition access. Please speak clearly into your microphone.
            </p>
          </div>
        </div>
      )}

      {/* 2. LISTENING STATE (REAL BROWSER SPEECH RECOGNITION ACTIVE) */}
      {voiceState === 'listening' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              
              {/* Pulse Animated Mic Indicator */}
              <div style={{
                position: 'relative',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#0891b2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 0 rgba(8, 145, 178, 0.4)',
                animation: 'pulseRing 1.5s infinite ease-out',
              }}>
                <Mic size={24} color="#ffffff" />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 800, color: '#0e7490' }}>
                    Listening... Speak your response clearly
                  </h4>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    backgroundColor: '#cff4fc',
                    color: '#055160',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    textTransform: 'uppercase',
                  }}>
                    Live STT
                  </span>
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: '#155e75', marginTop: '2px', fontWeight: 600 }}>
                  Transcript appears below in real-time. You can edit text before clicking Continue.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onStopListening}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: 'var(--font-size-xs)',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(220, 38, 38, 0.3)',
              }}
            >
              <Square size={14} fill="#ffffff" />
              <span>Stop Recording</span>
            </button>
          </div>

          {/* Waveform Visualizer Bars */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            height: '32px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #a5f3fc',
            padding: '0 1rem',
          }}>
            <Volume2 size={16} color="#0891b2" style={{ marginRight: '8px' }} />
            {[40, 75, 100, 60, 90, 45, 80, 55, 95, 70, 35, 85].map((height, i) => (
              <div
                key={i}
                style={{
                  width: '4px',
                  height: `${height}%`,
                  backgroundColor: '#06b6d4',
                  borderRadius: '2px',
                  opacity: 0.8,
                  transition: 'height 0.2s ease',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. STOPPED STATE */}
      {voiceState === 'stopped' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-slate-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MicOff size={20} color="#ffffff" />
            </div>
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-slate-800)' }}>
                Speech Recognition Completed / Stopped
              </h4>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-slate-600)', marginTop: '2px' }}>
                You can review and edit your transcribed text in the input box below before clicking Continue.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onStartListening}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'var(--color-brand-teal-600)',
                color: '#ffffff',
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: 'var(--font-size-xs)',
                cursor: 'pointer',
              }}
            >
              <Mic size={14} />
              <span>Resume Voice</span>
            </button>

            <button
              type="button"
              onClick={onResetState}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--color-slate-700)',
                border: '1px solid var(--color-slate-300)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: 'var(--font-size-xs)',
                cursor: 'pointer',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 4. UNSUPPORTED BROWSER STATE */}
      {voiceState === 'unsupported' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Info size={22} color="#d46b08" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: '#873800' }}>
                Speech Recognition Not Supported in this Browser
              </h4>
              <p style={{ fontSize: 'var(--font-size-xs)', color: '#a75d00', marginTop: '2px' }}>
                Speech Recognition API is unavailable in this browser. Please use Chrome, Edge, or type your response below.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onResetState}
            style={{
              backgroundColor: '#ffffff',
              color: '#873800',
              border: '1px solid #ffe58f',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: 'var(--font-size-xs)',
              cursor: 'pointer',
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 5. ERROR STATE */}
      {voiceState === 'error' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertCircle size={22} color="#dc2626" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: '#991b1b' }}>
                Voice Recognition Notice
              </h4>
              <p style={{ fontSize: 'var(--font-size-xs)', color: '#b91c1c', marginTop: '2px' }}>
                {errorMessage || 'Voice recognition encountered an issue. You can continue with text input below.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onStartListening}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#991b1b',
                color: '#ffffff',
                border: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: 'var(--font-size-xs)',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              <span>Try Again</span>
            </button>

            <button
              type="button"
              onClick={onResetState}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--color-slate-700)',
                border: '1px solid var(--color-slate-300)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: 'var(--font-size-xs)',
                cursor: 'pointer',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Keyframe Animation Styles for UI Pulse */}
      <style>{`
        @keyframes pulseRing {
          0% {
            box-shadow: 0 0 0 0 rgba(8, 145, 178, 0.5);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(8, 145, 178, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(8, 145, 178, 0);
          }
        }
      `}</style>

    </div>
  );
};
