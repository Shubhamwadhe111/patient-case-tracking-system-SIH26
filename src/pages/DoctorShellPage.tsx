import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DoctorPortalApp from '../../apps/doctor-portal/src/App';
import { CareConnectLogo } from '../components/common/CareConnectLogo';

export const DoctorShellPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Isolated Doctor Workspace Header */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <CareConnectLogo onClick={() => navigate('/hospital')} subtitleColor="#006565" />
          <div style={{ borderLeft: '1.5px solid #cbd5e1', height: '24px' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#111c2d' }}>
                Doctor Consultation Workspace
              </h1>
              <span style={{
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                border: '1px solid #a7f3d0',
              }}>
                Hospital Internal Module
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
              OPD Patient Queue &amp; Clinical History Consultation
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/hospital')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#ffffff',
            color: '#475569',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '0.45rem 0.85rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={15} />
          <span>Hospital Portal</span>
        </button>
      </header>

      {/* Render Doctor Portal App */}
      <main style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
          <DoctorPortalApp />
        </div>
      </main>
    </div>
  );
};

export default DoctorShellPage;

