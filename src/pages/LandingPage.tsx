import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Monitor, 
  UserCheck, 
  Mic, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Globe,
  Users,
  Mail,
  Phone
} from 'lucide-react';
import { CareConnectLogo } from '../components/common/CareConnectLogo';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#1e293b',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* 1. PUBLIC WEBSITE NAVBAR */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* CareConnect Brand Logo */}
        <CareConnectLogo 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        />

        {/* Public Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
          <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer', color: '#006565' }}>Home</span>
          <span onClick={() => scrollToSection('products')} style={{ cursor: 'pointer' }}>Products</span>
          <span onClick={() => scrollToSection('how-it-works')} style={{ cursor: 'pointer' }}>How It Works</span>
          <span onClick={() => scrollToSection('features')} style={{ cursor: 'pointer' }}>Features</span>
          <span onClick={() => scrollToSection('contact')} style={{ cursor: 'pointer' }}>Contact</span>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => navigate('/patient')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#ffffff',
              color: '#0284c7',
              border: '1.5px solid #bae6fd',
              borderRadius: '8px',
              padding: '0.6rem 1.1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Smartphone size={16} />
            <span>Patient App</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/hospital')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#006565',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,101,101,0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            <Monitor size={16} />
            <span>Hospital Portal</span>
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #004d4d 0%, #006565 50%, #0f172a 100%)',
        color: '#ffffff',
        padding: '4.5rem 1.5rem 5rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem',
        }}>
          
          {/* Trust Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(4px)',
            }}>
              <ShieldCheck size={16} color="#5ffbd6" />
              HIPAA &amp; ABDM Compliant Platform
            </span>

            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(4px)',
            }}>
              <Globe size={16} color="#5ffbd6" />
              Multilingual Support (8 Indian Languages)
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            maxWidth: '880px',
          }}>
            AI-Powered Clinical History &amp; Healthcare Platform
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#ccfbf1',
            margin: 0,
            maxWidth: '760px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}>
            Streamlining patient intake, document digitization, and clinical workflows for modern healthcare facilities and outpatient departments.
          </p>

          {/* Hero Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/hospital')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#5ffbd6',
                color: '#002019',
                border: 'none',
                borderRadius: '10px',
                padding: '0.9rem 1.8rem',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(95, 251, 214, 0.35)',
              }}
            >
              <Monitor size={20} />
              <span>Hospital Web Portal</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/patient')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                border: '1.5px solid rgba(255,255,255,0.3)',
                borderRadius: '10px',
                padding: '0.9rem 1.8rem',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Smartphone size={20} />
              <span>Patient Mobile App</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '820px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '1.25rem',
            backdropFilter: 'blur(8px)',
            boxSizing: 'border-box',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#5ffbd6' }}>75% Faster</div>
              <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: '2px' }}>OPD Check-in Time</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#5ffbd6' }}>8 Languages</div>
              <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: '2px' }}>Real-time Voice STT</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#5ffbd6' }}>Instant OCR</div>
              <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: '2px' }}>Document Digitization</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PRODUCTS SHOWCASE SECTION */}
      <section id="products" style={{
        padding: '5rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#006565', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            CARECONNECT PRODUCTS
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '8px 0 0 0', letterSpacing: '-0.02em' }}>
            Healthcare Solutions for Patients &amp; Providers
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', margin: '6px 0 0 0' }}>
            Seamlessly bridging patient intake on mobile with clinical management on web
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}>
          
          {/* PRODUCT 1: PATIENT MOBILE APP */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #cbd5e1',
            padding: '2.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.75rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            boxSizing: 'border-box',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '0.9rem',
                  backgroundColor: '#f0fdfa',
                  color: '#006565',
                  borderRadius: '14px',
                  border: '1px solid #a7f3d0',
                }}>
                  <Smartphone size={32} />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#006565',
                  backgroundColor: '#e6fffa',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  border: '1px solid #a7f3d0',
                }}>
                  MOBILE APPLICATION
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.6rem 0' }}>
                Patient Mobile App
              </h3>

              <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Touch &amp; voice-first mobile experience for patients to register, complete AI clinical intake, and upload medical documents prior to consultation.
              </p>

              <div style={{
                marginTop: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
                color: '#334155',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="#006565" />
                  <span>ABHA &amp; Mobile Patient Registration</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                  <Mic size={18} color="#006565" />
                  <span>Real-Time Voice STT Input (8 Languages)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                  <Sparkles size={18} color="#006565" />
                  <span>Adaptive Conversational AI Intake</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                  <FileText size={18} color="#006565" />
                  <span>Prescription &amp; Lab Report OCR Scanning</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/patient')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                backgroundColor: '#006565',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.9rem 1.4rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,101,101,0.25)',
              }}
            >
              <span>Launch Patient App</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* PRODUCT 2: HOSPITAL WEB PORTAL */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #cbd5e1',
            padding: '2.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.75rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            boxSizing: 'border-box',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{
                  padding: '0.9rem',
                  backgroundColor: '#f0f9ff',
                  color: '#0284c7',
                  borderRadius: '14px',
                  border: '1px solid #bae6fd',
                }}>
                  <Monitor size={32} />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#0284c7',
                  backgroundColor: '#e0f2fe',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  border: '1px solid #bae6fd',
                }}>
                  WEB APPLICATION
                </span>
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.6rem 0' }}>
                Hospital Web Portal
              </h3>

              <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Unified healthcare web application powering clinical and administrative hospital operations across four core modules:
              </p>

              <div style={{
                marginTop: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
                color: '#334155',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="#0284c7" />
                  <span>Hospital Admin &amp; OPD Operations</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                  <UserCheck size={18} color="#0284c7" />
                  <span>Doctor Management &amp; Live Rostering</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                  <Users size={18} color="#0284c7" />
                  <span>Patient Management &amp; Queue Tracking</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                  <Activity size={18} color="#0284c7" />
                  <span>Doctor Consultation Workspace (Doctor Portal)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/hospital')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.9rem 1.4rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(2,132,199,0.25)',
              }}
            >
              <span>Launch Hospital Portal</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </section>

      {/* 4. HOW IT WORKS WORKFLOW SECTION */}
      <section id="how-it-works" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '5rem 1.5rem', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#006565', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              AUTOMATED WORKFLOW
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '8px 0 0 0', letterSpacing: '-0.02em' }}>
              How CareConnect Works End-to-End
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b', margin: '6px 0 0 0' }}>
              Connecting patient intake to physician decision-making in 4 automated steps
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem',
          }}>
            
            {/* Step 1 */}
            <div style={{
              padding: '1.75rem',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#006565',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
              }}>
                1
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Patient Mobile Intake
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                Patient registers on the mobile app, selects their preferred language, and answers intake questions using voice STT or touch.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              padding: '1.75rem',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
              }}>
                2
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                AI Processing &amp; OCR
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                AI engine structures symptoms into standardized clinical history and extracts details from uploaded prescriptions and lab documents.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              padding: '1.75rem',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#0f766e',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
              }}>
                3
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Hospital Queue Routing
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                Intake data streams into the Hospital Web Portal, updating patient directory records and OPD queue positioning instantly.
              </p>
            </div>

            {/* Step 4 */}
            <div style={{
              padding: '1.75rem',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
              }}>
                4
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Doctor Consultation
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                Consulting physician opens the integrated Doctor Portal inside the Hospital Web App, reviews clinical summaries, and completes sign-off.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CORE FEATURES GRID SECTION */}
      <section id="features" style={{ padding: '5rem 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#006565', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            PLATFORM CAPABILITIES
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', margin: '8px 0 0 0', letterSpacing: '-0.02em' }}>
            Engineered for Clinical Efficiency
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', margin: '6px 0 0 0' }}>
            Core features designed for high-volume outpatient hospital environments
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
        }}>
          
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <Mic size={28} color="#006565" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Real-Time Voice STT Intake</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Hands-free speech recognition supporting 8 regional Indian languages with automatic text transcript fallback.</p>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <Sparkles size={28} color="#0284c7" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>AI-Assisted Clinical History</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Intelligent, adaptive questioning probing onset, symptom severity, prior medical history, and active medications.</p>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <FileText size={28} color="#0f766e" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>OCR Document Digitization</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Digitize printed or handwritten past prescriptions and lab reports into structured timeline records.</p>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <Activity size={28} color="#d97706" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Physician Clinical Summary</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Instant clinical history synthesis saving consulting physicians 3-5 minutes per patient consultation.</p>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <UserCheck size={28} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>Doctor Roster Management</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Live OPD room assignments, physician shift tracking, and availability status management in the Hospital Web Portal.</p>
          </div>

          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '1.75rem', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <Users size={28} color="#6366f1" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem 0' }}>OPD Directory &amp; Queue Tracking</h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.6 }}>Centralized patient directory, live OPD queue positioning, and department check-in tracking.</p>
          </div>

        </div>

      </section>

      {/* 6. REDESIGNED CLEAN LIGHTWEIGHT FOOTER */}
      <footer id="contact" style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
        color: '#475569',
        padding: '3.5rem 2rem 2rem 2rem',
        marginTop: 'auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
            {/* Column 1: Brand */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <CareConnectLogo 
                size={22}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.6, maxWidth: '300px' }}>
                AI-Powered Healthcare Platform. Streamlining patient intake, document OCR digitization, and hospital clinical workflows.
              </p>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <h5 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 0.85rem 0', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                Solutions
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                <span onClick={() => navigate('/patient')} style={{ cursor: 'pointer', color: '#006565', fontWeight: 600 }}>Patient Mobile App</span>
                <span onClick={() => navigate('/hospital')} style={{ cursor: 'pointer', color: '#006565', fontWeight: 600 }}>Hospital Web Portal</span>
              </div>
            </div>

            {/* Column 3: Platform */}
            <div>
              <h5 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 0.85rem 0', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                Platform
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                <span onClick={() => scrollToSection('products')} style={{ cursor: 'pointer', color: '#475569' }}>Products</span>
                <span onClick={() => scrollToSection('how-it-works')} style={{ cursor: 'pointer', color: '#475569' }}>How It Works</span>
                <span onClick={() => scrollToSection('features')} style={{ cursor: 'pointer', color: '#475569' }}>Features</span>
                <span onClick={() => scrollToSection('contact')} style={{ cursor: 'pointer', color: '#475569' }}>Contact</span>
              </div>
            </div>

            {/* Column 4: Contact & Legal */}
            <div>
              <h5 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 0.85rem 0', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                Support &amp; Legal
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={15} color="#006565" />
                  <span>support@careconnect.in</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={15} color="#006565" />
                  <span>1800-CARE-CONNECT</span>
                </div>
                <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.25rem', fontSize: '0.85rem' }}>
                  <span style={{ cursor: 'pointer', color: '#0284c7', fontWeight: 600 }}>Privacy Policy</span>
                  <span style={{ cursor: 'pointer', color: '#0284c7', fontWeight: 600 }}>Terms of Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Divider */}
          <div style={{
            borderTop: '1px solid #cbd5e1',
            paddingTop: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#64748b',
          }}>
            <span>&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</span>
            <span>AI-Powered Healthcare Platform</span>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
