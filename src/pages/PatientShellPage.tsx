import React, { useState } from 'react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { 
  ShieldCheck, 
  RotateCcw, 
  HeartPulse, 
  Home, 
  FileText, 
  FileUp, 
  User, 
  ArrowLeft,
  Upload
} from 'lucide-react';
import type { OnboardingStep, OnboardingData } from '../types/onboarding';
import type { HistoryResponse } from '../types/clinicalHistory';
import { 
  DEFAULT_ONBOARDING_DATA, 
  DEMO_PATIENT_PRESET 
} from '../types/onboarding';
import { StepProgress } from '../components/patient/StepProgress';
import { WelcomeStep } from '../components/patient/WelcomeStep';
import { LanguageStep } from '../components/patient/LanguageStep';
import { IdentificationStep } from '../components/patient/IdentificationStep';
import { ProfileStep } from '../components/patient/ProfileStep';
import { ConsentStep } from '../components/patient/ConsentStep';
import { DepartmentStep } from '../components/patient/DepartmentStep';
import { ReadyStep } from '../components/patient/ReadyStep';
import { ClinicalHistoryIntroStep } from '../components/patient/ClinicalHistoryIntroStep';
import { ClinicalHistoryConversationStep } from '../components/patient/ClinicalHistoryConversationStep';
import { CareConnectLogo } from '../components/common/CareConnectLogo';

export type PatientAppTab = 'home' | 'history' | 'documents' | 'profile';

export const PatientShellPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PatientAppTab>('home');
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('WELCOME');
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(DEFAULT_ONBOARDING_DATA);
  const [historyResponses, setHistoryResponses] = useState<HistoryResponse[]>([]);
  const [resumeQuestionIndex, setResumeQuestionIndex] = useState<number>(0);

  // Document Upload State
  const [uploadedDocs, setUploadedDocs] = useState<Array<{ name: string; type: string; date: string; status: string }>>([
    { name: 'Discharge_Summary_2025.pdf', type: 'Discharge Summary', date: '2025-11-14', status: 'OCR Processed & Linked' },
    { name: 'Blood_Report_Jan2026.pdf', type: 'Lab Test Report', date: '2026-01-20', status: 'OCR Processed & Linked' }
  ]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const updateData = (updates: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...updates }));
  };

  const handleSelectDemoPatient = () => {
    setOnboardingData(DEMO_PATIENT_PRESET);
    setCurrentStep('READY');
  };

  const handleConsentToggle = (granted: boolean) => {
    updateData({
      isConsentGiven: granted,
      consentTimestamp: granted ? new Date().toISOString() : undefined,
    });
  };

  const handleRestart = () => {
    setOnboardingData(DEFAULT_ONBOARDING_DATA);
    setHistoryResponses([]);
    setCurrentStep('WELCOME');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        setUploadedDocs(prev => [
          ...prev,
          {
            name: files[0].name,
            type: 'Uploaded Prescriptions/Record',
            date: new Date().toISOString().split('T')[0],
            status: 'OCR Extracting Medical Data...'
          }
        ]);
        setIsUploading(false);
      }, 1200);
    }
  };

  const isPhase3Active = currentStep === 'CLINICAL_HISTORY_INTRO' || currentStep === 'CLINICAL_HISTORY_CONVERSATION';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#1e293b',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 1. DEDICATED PATIENT APP HEADER */}
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
          <CareConnectLogo onClick={() => window.location.href = '/'} subtitleColor="#006565" />
          <div style={{ borderLeft: '1.5px solid #cbd5e1', height: '24px' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#111c2d' }}>
                CareConnect Patient App
              </h1>
              <span style={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                border: '1px solid #bae6fd',
              }}>
                Patient Mobile Workspace
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
              AI Clinical History &amp; Kiosk Intake
            </p>
          </div>
        </div>

        {/* PATIENT NAVIGATION TABS (DESKTOP / MOBILE HEADER) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '3px',
            borderRadius: '8px',
            gap: '2px',
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'home' ? '#ffffff' : 'transparent',
                color: activeTab === 'home' ? '#006565' : '#64748b',
                fontWeight: activeTab === 'home' ? 700 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'home' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <Home size={15} />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'history' ? '#ffffff' : 'transparent',
                color: activeTab === 'history' ? '#006565' : '#64748b',
                fontWeight: activeTab === 'history' ? 700 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'history' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <FileText size={15} />
              <span>Clinical History</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'documents' ? '#ffffff' : 'transparent',
                color: activeTab === 'documents' ? '#006565' : '#64748b',
                fontWeight: activeTab === 'documents' ? 700 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'documents' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <FileUp size={15} />
              <span>Documents</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: activeTab === 'profile' ? '#ffffff' : 'transparent',
                color: activeTab === 'profile' ? '#006565' : '#64748b',
                fontWeight: activeTab === 'profile' ? 700 : 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'profile' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <User size={15} />
              <span>Profile</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => window.location.href = '/'}
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
              marginLeft: '0.5rem',
            }}
          >
            <ArrowLeft size={15} />
            <span>Website</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN PATIENT APP BODY */}
      <main style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '780px', width: '100%' }}>

          {/* TAB 1: HOME (PATIENT INTAKE & CLINICAL HISTORY FLOW) */}
          {activeTab === 'home' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Kiosk Status Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
              }}>
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Patient Intake Kiosk
                  </h2>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
                    {isPhase3Active ? 'AI Clinical History Taking Session' : 'Registration & OPD Intake'}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Badge variant={isPhase3Active ? 'info' : 'success'} icon={isPhase3Active ? <HeartPulse size={14} /> : <ShieldCheck size={14} />}>
                    {isPhase3Active ? 'Clinical History Session' : 'Registration Active'}
                  </Badge>
                  {currentStep !== 'WELCOME' && (
                    <Button variant="secondary" icon={<RotateCcw size={15} />} onClick={handleRestart} style={{ minHeight: '34px', height: '34px', padding: '0 0.75rem', fontSize: '0.8rem' }}>
                      Reset Flow
                    </Button>
                  )}
                </div>
              </div>

              {/* Step Progress Indicator */}
              <StepProgress currentStep={currentStep} />

              {/* Step Views Switcher */}
              {currentStep === 'WELCOME' && (
                <WelcomeStep onStart={() => setCurrentStep('LANGUAGE')} />
              )}

              {currentStep === 'LANGUAGE' && (
                <LanguageStep
                  selectedLanguage={onboardingData.languageCode}
                  onSelectLanguage={(code) => updateData({ languageCode: code })}
                  onNext={() => setCurrentStep('IDENTIFICATION')}
                  onBack={() => setCurrentStep('WELCOME')}
                />
              )}

              {currentStep === 'IDENTIFICATION' && (
                <IdentificationStep
                  identificationType={onboardingData.identificationType}
                  abhaIdInput={onboardingData.abhaIdInput || ''}
                  onSelectType={(type) => updateData({ identificationType: type })}
                  onChangeAbhaId={(val) => updateData({ abhaIdInput: val })}
                  onSelectDemoPatient={handleSelectDemoPatient}
                  onNext={() => setCurrentStep('PROFILE')}
                  onBack={() => setCurrentStep('LANGUAGE')}
                />
              )}

              {currentStep === 'PROFILE' && (
                <ProfileStep
                  data={onboardingData}
                  onChangeData={updateData}
                  onNext={() => setCurrentStep('CONSENT')}
                  onBack={() => setCurrentStep('IDENTIFICATION')}
                />
              )}

              {currentStep === 'CONSENT' && (
                <ConsentStep
                  isConsentGiven={onboardingData.isConsentGiven}
                  onToggleConsent={handleConsentToggle}
                  onNext={() => setCurrentStep('DEPARTMENT')}
                  onBack={() => setCurrentStep('PROFILE')}
                />
              )}

              {currentStep === 'DEPARTMENT' && (
                <DepartmentStep
                  selectedDepartmentId={onboardingData.departmentId}
                  onSelectDepartment={(id, name) => updateData({ departmentId: id, departmentName: name })}
                  onNext={() => setCurrentStep('READY')}
                  onBack={() => setCurrentStep('CONSENT')}
                />
              )}

              {currentStep === 'READY' && (
                <ReadyStep
                  data={onboardingData}
                  onRestart={handleRestart}
                  onStartClinicalHistory={() => setCurrentStep('CLINICAL_HISTORY_INTRO')}
                />
              )}

              {currentStep === 'CLINICAL_HISTORY_INTRO' && (
                <ClinicalHistoryIntroStep
                  patientData={onboardingData}
                  onStart={(resumeIdx) => {
                    setResumeQuestionIndex(resumeIdx || 0);
                    setCurrentStep('CLINICAL_HISTORY_CONVERSATION');
                  }}
                  onBack={() => setCurrentStep('READY')}
                />
              )}

              {currentStep === 'CLINICAL_HISTORY_CONVERSATION' && (
                <ClinicalHistoryConversationStep
                  patientData={onboardingData}
                  initialQuestionIndex={resumeQuestionIndex}
                  onFinish={(responses) => {
                    setHistoryResponses(responses);
                  }}
                  onBackToIntro={() => setCurrentStep('CLINICAL_HISTORY_INTRO')}
                />
              )}
            </div>
          )}

          {/* TAB 2: CLINICAL HISTORY RECORD */}
          {activeTab === 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.5rem',
              }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0, marginBottom: '0.4rem' }}>
                  My Clinical History Sessions
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, marginBottom: '1.25rem' }}>
                  Recorded patient intake responses and chief complaints for physician consultation.
                </p>

                {historyResponses.length === 0 ? (
                  <div style={{
                    backgroundColor: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '8px',
                    padding: '2rem',
                    textAlign: 'center',
                  }}>
                    <HeartPulse size={36} color="#006565" style={{ marginBottom: '0.5rem' }} />
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                      No Active Clinical Session Completed Yet
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', marginBottom: '1rem' }}>
                      Start your intake on the Home tab to complete your AI clinical history taking.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('home')}
                      style={{
                        backgroundColor: '#006565',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.55rem 1rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Start Patient Intake →
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{
                      backgroundColor: '#f0fdfa',
                      border: '1px solid #99f6e4',
                      borderRadius: '8px',
                      padding: '1rem',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#006565' }}>
                          Active OPD Clinical Session ({historyResponses.length} Question Answers)
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#065f46', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '12px' }}>
                          Ready for Doctor Review
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {historyResponses.map((item, idx) => (
                          <div key={idx} style={{ padding: '0.35rem 0', borderBottom: idx < historyResponses.length - 1 ? '1px solid #ccfbf1' : 'none' }}>
                            <strong style={{ color: '#0f172a' }}>Q: {item.questionText}</strong>
                            <div style={{ color: '#006565', fontWeight: 600 }}>A: {item.answerRawText}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS (PRESCRIPTIONS & LAB REPORTS OCR) */}
          {activeTab === 'documents' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.5rem',
              }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0, marginBottom: '0.4rem' }}>
                  Medical Documents &amp; Prescriptions
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, marginBottom: '1.25rem' }}>
                  Upload past prescriptions, discharge summaries, or lab reports for AI OCR extraction.
                </p>

                {/* UPLOADER BOX */}
                <div style={{
                  border: '2px dashed #006565',
                  backgroundColor: '#f0fdfa',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  position: 'relative',
                }}>
                  <Upload size={32} color="#006565" style={{ marginBottom: '0.5rem' }} />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {isUploading ? 'Uploading and Processing Document...' : 'Upload Medical Document / Report'}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.25rem 0 1rem 0' }}>
                    Supports PDF, JPG, PNG formats up to 10MB
                  </p>
                  <label style={{
                    backgroundColor: '#006565',
                    color: '#ffffff',
                    padding: '0.55rem 1.25rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <FileUp size={16} />
                    <span>Select File to Upload</span>
                    <input type="file" onChange={handleFileUpload} accept="image/*,.pdf" style={{ display: 'none' }} />
                  </label>
                </div>

                {/* DOCUMENT LIST */}
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.75rem' }}>
                  Attached Patient Documents ({uploadedDocs.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {uploadedDocs.map((doc, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: '#e0f2fe', borderRadius: '6px', color: '#0369a1' }}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{doc.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.type} • Uploaded {doc.date}</div>
                        </div>
                      </div>

                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#065f46',
                        backgroundColor: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        padding: '3px 8px',
                        borderRadius: '12px',
                      }}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#006565',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    fontWeight: 800,
                  }}>
                    {onboardingData.fullName ? onboardingData.fullName.charAt(0) : 'P'}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {onboardingData.fullName || 'Rahul Sharma'}
                    </h2>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      ABHA ID: {onboardingData.abhaIdInput || '91-8823-4410-9012'} • Gender: {onboardingData.gender || 'Male'} • Age: {onboardingData.age || 34}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Mobile Number</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginTop: '0.25rem' }}>
                      {onboardingData.phone || '+91 98765 43210'}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Preferred Language</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#006565', marginTop: '0.25rem' }}>
                      {onboardingData.languageCode === 'hi' ? 'Hindi (हिंदी)' : 'English'}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Emergency Contact</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginTop: '0.25rem' }}>
                      +91 98765 00000
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Assigned OPD Department</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginTop: '0.25rem' }}>
                      {onboardingData.departmentName || 'General Medicine'}
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.8rem',
                  color: '#065f46',
                  fontWeight: 600,
                }}>
                  <ShieldCheck size={20} color="#065f46" />
                  <span>Health Data Consent Granted under ABDM Guidelines • CareConnect Encryption Active</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default PatientShellPage;

