import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { CareConnectLogo } from '../../../../src/components/common/CareConnectLogo';

export interface HospitalInfo {
  name: string;
  code: string;
  email: string;
  department: string;
}

export interface HospitalLoginProps {
  onLoginSuccess: (info: HospitalInfo) => void;
}

export const HospitalLogin: React.FC<HospitalLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('admin@citycare.in');
  const [password, setPassword] = useState<string>('hospital123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both Hospital Email / ID and Password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'CityCare Multispeciality Hospital',
        code: 'HOSP-CITY-2026',
        email: email,
        department: 'Central OPD Administration',
      });
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#1e293b',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 1. DEDICATED HOSPITAL PORTAL HEADER */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <CareConnectLogo 
            onClick={handleGoHome}
            subtitleColor="#006565"
          />
          <div style={{ borderLeft: '1.5px solid #cbd5e1', height: '24px', margin: '0 0.25rem' }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
              Hospital Web Portal
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
              Hospital Administration &amp; Clinical Operations
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#ffffff',
            color: '#475569',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '0.5rem 0.9rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Website</span>
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1.5rem',
      }}>
        <div style={{
          maxWidth: '440px',
          width: '100%',
        }}>

          {/* BRANDING HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <CareConnectLogo 
              size={28}
              onClick={handleGoHome}
              subtitleColor="#006565"
              className="center-logo"
            />
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.75rem', marginBottom: 0, fontWeight: 500 }}>
              Hospital Administration &amp; Clinical Operations
            </p>
          </div>

          {/* LOGIN CARD */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #cbd5e1',
            padding: '2.25rem 2rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          }}>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Hospital Portal Sign In
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, marginTop: '0.35rem' }}>
                Enter your administrative credentials to access hospital operations.
              </p>
            </div>

            {/* ERROR BANNER */}
            {errorMessage && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1.25rem',
                fontSize: '0.8rem',
                color: '#dc2626',
                fontWeight: 600,
              }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {/* HOSPITAL EMAIL / ID */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#334155',
                  marginBottom: '0.4rem',
                }}>
                  Hospital ID / Admin Email
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@citycare.in"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.85rem',
                      paddingLeft: '2.5rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <Building2 size={16} color="#64748b" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* PASSWORD WITH TOGGLE */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <label style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#334155',
                  }}>
                    Password
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#006565', fontWeight: 600 }}>
                    Encrypted Sign-In
                  </span>
                </div>

                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      color: '#0f172a',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  backgroundColor: '#006565',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: isLoading ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 10px rgba(0, 101, 101, 0.2)',
                }}
              >
                <span>{isLoading ? 'Signing in...' : 'Sign In to Hospital Portal'}</span>
                {!isLoading && <ArrowRight size={16} />}
              </button>

            </form>

            {/* SECURITY BANNER */}
            <div style={{
              marginTop: '1.5rem',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.85rem',
              fontSize: '0.75rem',
              color: '#64748b',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                <ShieldCheck size={14} color="#006565" />
                <span>CareConnect Administrative Access</span>
              </div>
              Authorized hospital staff only. Enter your administrator email and password to log in.
            </div>

          </div>

          {/* FOOTER */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.75rem', color: '#94a3b8' }}>
            CareConnect Healthcare Platform • Hospital Web Portal
          </div>

        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
