import React, { useState } from 'react';
import { 
  Stethoscope, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Clock 
} from 'lucide-react';

export interface DoctorLoginProps {
  onLoginSuccess: (doctorInfo: { name: string; department: string; email: string }) => void;
}

export const DoctorLogin: React.FC<DoctorLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('dr.ananya@careconnect.in');
  const [password, setPassword] = useState<string>('doctor123');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setLoginError('Please enter both Doctor ID / Email and Password.');
      return;
    }

    setLoginError(null);
    setIsLoading(true);

    // Simple frontend-only demo login simulation
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Dr. Ananya Rao',
        department: 'General Medicine OPD',
        email: email.trim(),
      });
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.5rem',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    }}>
      
      {/* Container Card */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        overflow: 'hidden',
      }}>
        
        {/* Top Header Banner */}
        <div style={{
          backgroundColor: '#006565',
          padding: '2rem 1.5rem',
          color: '#ffffff',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #006565 0%, #008080 100%)',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(4px)',
            marginBottom: '1rem',
          }}>
            <Stethoscope size={30} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            CareConnect
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#e3fffe', marginTop: '0.25rem', opacity: 0.9 }}>
            Physician Clinical Portal • OPD Intake & Queue
          </p>
        </div>

        {/* OPD Notice Banner */}
        <div style={{
          backgroundColor: '#f0f3ff',
          borderBottom: '1px solid #dee8ff',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.8rem',
          color: '#035584',
        }}>
          <Clock size={16} color="#206393" style={{ flexShrink: 0 }} />
          <span><strong>OPD Schedule:</strong> 08:00 AM – 08:00 PM • General Medicine OPD Room 104</span>
        </div>

        {/* Form Body */}
        <div style={{ padding: '2rem 1.5rem' }}>
          
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111c2d', margin: 0 }}>
              Physician Sign In
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#6e7979', marginTop: '0.25rem' }}>
              Enter your credentials to access patient intake queue
            </p>
          </div>

          {/* Demo Login Notice Banner */}
          <div style={{
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem',
            fontSize: '0.8rem',
            color: '#065f46',
          }}>
            <ShieldCheck size={18} color="#059669" style={{ flexShrink: 0, marginTop: '1px' }} />
            <div>
              <strong>Authorized Physician Access:</strong> Enter your credentials to access the OPD consultation queue.
            </div>
          </div>

          {loginError && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              color: '#991b1b',
              fontSize: '0.85rem',
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Email / Doctor ID Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#3e4949', marginBottom: '0.4rem' }}>
                Doctor ID / Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={18} color="#6e7979" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dr.name@hospital.org"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#111c2d',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#3e4949' }}>
                  Password
                </label>
                <a 
                  href="#forgot-password" 
                  onClick={(e) => { e.preventDefault(); alert('Forgot password feature is a visual placeholder for demo.'); }}
                  style={{ fontSize: '0.75rem', color: '#206393', fontWeight: 600, textDecoration: 'none' }}
                >
                  Forgot Password?
                </a>
              </div>

              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} color="#6e7979" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    color: '#111c2d',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={18} color="#6e7979" /> : <Eye size={18} color="#6e7979" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.85rem',
                backgroundColor: '#006565',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 10px rgba(0, 101, 101, 0.25)',
                transition: 'background-color 0.2s ease',
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In to Portal'}
              {!isLoading && <ArrowRight size={18} />}
            </button>

          </form>

          {/* Hospital Footer Info */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: '#94a3b8',
          }}>
            <Building2 size={14} color="#94a3b8" />
            <span>CareConnect Healthcare Systems • Doctor Portal</span>
          </div>

        </div>

      </div>

    </div>
  );
};
