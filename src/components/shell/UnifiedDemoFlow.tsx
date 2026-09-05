import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  UserCheck, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  Mic, 
  FileText, 
  Users 
} from 'lucide-react';

export interface UnifiedDemoFlowProps {
  onSelectRole?: (role: 'patient' | 'doctor' | 'hospital') => void;
}

export const UnifiedDemoFlow: React.FC<UnifiedDemoFlowProps> = ({ onSelectRole }) => {
  const navigate = useNavigate();

  const handleNavigation = (role: 'patient' | 'doctor' | 'hospital', path: string) => {
    if (onSelectRole) {
      onSelectRole(role);
    }
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1200px', margin: '0 auto', padding: '0 0.5rem' }}>
      
      {/* 1. HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #006565 0%, #0f172a 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 10px 25px -5px rgba(0, 101, 101, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: '12px',
            border: '1px solid #a7f3d0',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <ShieldCheck size={14} />
            CARECONNECT UNIFIED PLATFORM
          </span>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '12px',
          }}>
            OPD Status: Active Demo Environment
          </span>
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          Welcome to CareConnect
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#ccfbf1', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
          AI-Assisted Patient Case-Taking &amp; Clinical Workflow Platform
        </p>

        <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>
          Select a portal role below to launch the interactive demo environment for patients, consulting physicians, or hospital administrators.
        </p>
      </div>

      {/* 2. THREE ROLE SELECTION CARDS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
              Select Portal Experience
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '2px 0 0 0' }}>
              Seamlessly connected end-to-end OPD healthcare modules
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          
          {/* CARD 1: PATIENT KIOSK */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #cbd5e1',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
          }}>
            <div>
              {/* Header Badge & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: '#f0fdfa',
                  color: '#006565',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <User size={28} color="#006565" />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#006565',
                  backgroundColor: '#f0fdfa',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid #a7f3d0',
                  letterSpacing: '0.05em',
                }}>
                  👤 PATIENT
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                Patient Kiosk
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.5, minHeight: '42px' }}>
                Complete registration, clinical history and provide answers using text or voice.
              </p>

              {/* Highlights */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.85rem',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: '#334155',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <CheckCircle2 size={14} color="#006565" />
                  <span>8 Indian Regional Languages</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <Mic size={14} color="#006565" />
                  <span>Real Speech-to-Text Voice Input</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <Sparkles size={14} color="#006565" />
                  <span>Adaptive Gemini Conversational Intake</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => handleNavigation('patient', '/patient')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#006565',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,101,101,0.2)',
              }}
            >
              <span>Enter Patient Kiosk</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* CARD 2: DOCTOR PORTAL */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #cbd5e1',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
          }}>
            <div>
              {/* Header Badge & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: '#f0f9ff',
                  color: '#0284c7',
                  border: '1px solid #bae6fd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <UserCheck size={28} color="#0284c7" />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#0284c7',
                  backgroundColor: '#f0f9ff',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid #bae6fd',
                  letterSpacing: '0.05em',
                }}>
                  👨‍⚕️ DOCTOR
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                Doctor Portal
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.5, minHeight: '42px' }}>
                Review patient clinical history and conduct consultations.
              </p>

              {/* Highlights */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.85rem',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: '#334155',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <Users size={14} color="#0284c7" />
                  <span>Live OPD Patient Queue Manager</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <FileText size={14} color="#0284c7" />
                  <span>Structured Clinical History Review</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <Activity size={14} color="#0284c7" />
                  <span>Interactive Consultation &amp; Sign-off</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => handleNavigation('doctor', '/doctor')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(2,132,199,0.2)',
              }}
            >
              <span>Enter Doctor Portal</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* CARD 3: HOSPITAL PORTAL */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #cbd5e1',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.25rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
          }}>
            <div>
              {/* Header Badge & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: '#f0fdfa',
                  color: '#0f766e',
                  border: '1px solid #99f6e4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Building2 size={28} color="#0f766e" />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#0f766e',
                  backgroundColor: '#f0fdfa',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  border: '1px solid #99f6e4',
                  letterSpacing: '0.05em',
                }}>
                  🏥 HOSPITAL
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>
                Hospital Portal
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#475569', margin: 0, lineHeight: 1.5, minHeight: '42px' }}>
                Manage doctors, patients and hospital operations.
              </p>

              {/* Highlights */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.85rem',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: '#334155',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <UserCheck size={14} color="#0f766e" />
                  <span>Doctor Roster &amp; Live Availability</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <Users size={14} color="#0f766e" />
                  <span>Patient Directory &amp; Intake Tracking</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                  <Activity size={14} color="#0f766e" />
                  <span>OPD Operations &amp; Department Metrics</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => handleNavigation('hospital', '/hospital')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#0f766e',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(15,118,110,0.2)',
              }}
            >
              <span>Enter Hospital Portal</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>

      {/* 3. SYSTEM FOOTER */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem 1.25rem',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: '0.75rem',
        color: '#64748b',
      }}>
        <span>
          CareConnect System Version 2.0 | Option B Monorepo | Built for Indian OPD Healthcare
        </span>
        <span style={{ fontWeight: 600, color: '#006565' }}>
          Design System: Clinical Precision
        </span>
      </div>

    </div>
  );
};

export default UnifiedDemoFlow;
