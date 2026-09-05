import React, { useState } from 'react';
import { 
  Stethoscope, 
  ArrowLeft, 
  User, 
  CheckCircle2, 
  Sparkles, 
  Save, 
  Check, 
  Calendar, 
  Building2, 
  Activity, 
  Mic, 
  Type, 
  Clock,
  ShieldCheck
} from 'lucide-react';

export interface DoctorConsultationProps {
  patient: {
    id: string;
    patientId: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    department: string;
    checkInTime: string;
    status: string;
    chiefComplaint: string;
  };
  doctorInfo: {
    name: string;
    department: string;
    email: string;
  };
  onBackToHistory: () => void;
  onReturnToQueue?: () => void;
}

interface IntakeTurn {
  order: number;
  questionText: string;
  patientAnswer: string;
  inputMethod: 'text' | 'voice';
  isAiGenerated?: boolean;
}

export const DoctorConsultation: React.FC<DoctorConsultationProps> = ({
  patient,
  doctorInfo,
  onBackToHistory,
  onReturnToQueue
}) => {
  const [doctorNotes, setDoctorNotes] = useState<string>('');
  const [isNotesSaved, setIsNotesSaved] = useState<boolean>(false);
  const [savedTimestamp, setSavedTimestamp] = useState<string>('');
  const [consultationStatus, setConsultationStatus] = useState<'Active' | 'Completed'>('Active');

  // Demo 7-Question Timeline Data
  const intakeHistory: IntakeTurn[] = [
    {
      order: 1,
      questionText: 'What is your primary medical concern or chief complaint today?',
      patientAnswer: patient.chiefComplaint || 'Severe headache behind right eye for 3 days, worse in the evening.',
      inputMethod: 'text',
    },
    {
      order: 2,
      questionText: 'When did this problem start and how has it progressed?',
      patientAnswer: 'It started 3 days ago gradually. It gets worse every evening around 6 PM after work.',
      inputMethod: 'voice',
      isAiGenerated: true,
    },
    {
      order: 3,
      questionText: 'Can you describe the pain or discomfort in detail?',
      patientAnswer: 'Throbbing and pressing pain localized behind my right eye, radiating slightly to the right temple.',
      inputMethod: 'voice',
    },
    {
      order: 4,
      questionText: 'On a scale of 1 to 10, how severe is your pain?',
      patientAnswer: 'Around 8 out of 10 in the evening, around 4 out of 10 in the morning.',
      inputMethod: 'text',
    },
    {
      order: 5,
      questionText: 'Have you experienced similar symptoms or prior medical conditions in the past?',
      patientAnswer: 'No chronic illness. Occasional tension headaches 1-2 times per year, but never this persistent.',
      inputMethod: 'text',
    },
    {
      order: 6,
      questionText: 'Are you currently taking any medications or treatments?',
      patientAnswer: 'Took Paracetamol 500mg yesterday which gave temporary relief for 2-3 hours.',
      inputMethod: 'text',
    },
    {
      order: 7,
      questionText: 'Is there any additional information you would like the doctor to know?',
      patientAnswer: 'Bright light and loud computer speakers bother my eyes when the headache is severe.',
      inputMethod: 'voice',
      isAiGenerated: true,
    },
  ];

  const handleSaveNotes = () => {
    if (!doctorNotes.trim()) {
      alert('Please enter clinical notes before saving.');
      return;
    }
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSavedTimestamp(timeString);
    setIsNotesSaved(true);
    setTimeout(() => {
      setIsNotesSaved(false);
    }, 4000);
  };

  const handleCompleteConsultation = () => {
    setConsultationStatus('Completed');
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSavedTimestamp(timeString);
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
      {/* 1. DOCTOR PORTAL HEADER */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            backgroundColor: '#006565',
            color: '#ffffff',
            padding: '0.5rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Stethoscope size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#111c2d' }}>
                CareConnect Doctor Portal
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
                Consultation Studio
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
              Physician OPD Consultation • {doctorInfo.name} ({doctorInfo.department})
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToHistory}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#ffffff',
            color: '#334155',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '0.45rem 0.85rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Clinical History</span>
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <main style={{
        flex: 1,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}>

        {/* PATIENT HEADER CARD */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #cbd5e1',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <User size={28} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
                    {patient.name}
                  </h2>
                  <span style={{
                    backgroundColor: '#006565',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}>
                    {patient.patientId}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.35rem', fontSize: '0.85rem', color: '#64748b' }}>
                  <span>{patient.age} yrs • {patient.gender}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Building2 size={14} />
                    {patient.department}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} />
                    Session: Today, 09:15 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Consultation Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {consultationStatus === 'Active' ? (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: '#f0fdfa',
                  color: '#006565',
                  border: '2px solid #008080',
                }}>
                  <Activity size={16} color="#008080" />
                  <span>Consultation Active</span>
                </span>
              ) : (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  border: '2px solid #10b981',
                }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>Consultation Completed</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* TWO COLUMN GRID LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: '1.5rem',
          alignItems: 'start',
        }}>

          {/* LEFT SIDE: PATIENT INFORMATION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* SECTION 1: CHIEF COMPLAINT */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '4px', height: '18px', backgroundColor: '#006565', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#006565', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  1. Chief Complaint
                </h3>
              </div>
              <div style={{
                backgroundColor: '#f0fdfa',
                borderLeft: '4px solid #008080',
                padding: '0.85rem 1rem',
                borderRadius: '0 8px 8px 0',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#0f172a',
                lineHeight: 1.5,
              }}>
                "{patient.chiefComplaint || 'Severe headache behind right eye for 3 days, worse in the evening.'}"
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span>• Onset: Gradual (3 days ago)</span>
                <span>• Severity: 8/10 (Evening Peak)</span>
              </div>
            </div>

            {/* SECTION 2: CLINICAL HISTORY SUMMARY */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '4px', height: '18px', backgroundColor: '#006565', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#006565', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2. Clinical History Summary
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Location & Quality</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>Throbbing pain behind right eye & temple</div>
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Aggravating Factors</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>Bright light, computer screen & loud noise</div>
                </div>
              </div>
            </div>

            {/* SECTION 3 & 4: CURRENT MEDICATIONS & PREVIOUS HISTORY */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              {/* SECTION 3: MEDICATIONS */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.1rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <div style={{ width: '4px', height: '16px', backgroundColor: '#0284c7', borderRadius: '2px' }} />
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0369a1', margin: 0, textTransform: 'uppercase' }}>
                    3. Current Medications
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#334155', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                  Paracetamol 500mg taken yesterday for pain relief. No chronic daily prescriptions.
                </p>
              </div>

              {/* SECTION 4: PREVIOUS HISTORY */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.1rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <div style={{ width: '4px', height: '16px', backgroundColor: '#0284c7', borderRadius: '2px' }} />
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0369a1', margin: 0, textTransform: 'uppercase' }}>
                    4. Previous History
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#334155', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                  No hypertension, diabetes, or asthma. Occasional tension headaches 1-2 times per year.
                </p>
              </div>
            </div>

            {/* SECTION 5: PATIENT NOTES */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <div style={{ width: '4px', height: '16px', backgroundColor: '#475569', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', margin: 0, textTransform: 'uppercase' }}>
                  5. Patient Notes & Observations
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#334155', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                Patient noted that symptoms intensify after long computer work hours. No nausea, vomiting, or visual disturbance reported.
              </p>
            </div>

            {/* SECTION 6: CLINICAL HISTORY TIMELINE (7 QUESTIONS) */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                paddingBottom: '0.65rem',
                borderBottom: '1px solid #e2e8f0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '4px', height: '18px', backgroundColor: '#006565', borderRadius: '2px' }} />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#006565', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    6. Chronological Intake History (7/7)
                  </h3>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7', backgroundColor: '#e0f2fe', padding: '2px 8px', borderRadius: '12px' }}>
                  Verified Intake Log
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {intakeHistory.map((turn) => (
                  <div
                    key={turn.order}
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      padding: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#006565' }}>
                        Q{turn.order} Intake Question
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {turn.isAiGenerated && (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: '#7c3aed',
                            backgroundColor: '#f3e8ff',
                            padding: '1px 6px',
                            borderRadius: '4px',
                          }}>
                            <Sparkles size={10} /> AI Probe
                          </span>
                        )}
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: turn.inputMethod === 'voice' ? '#0369a1' : '#475569',
                          backgroundColor: turn.inputMethod === 'voice' ? '#e0f2fe' : '#f1f5f9',
                          padding: '1px 6px',
                          borderRadius: '4px',
                        }}>
                          {turn.inputMethod === 'voice' ? <Mic size={10} /> : <Type size={10} />}
                          {turn.inputMethod === 'voice' ? 'Voice STT' : 'Text'}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      {turn.questionText}
                    </div>

                    <div style={{
                      fontSize: '0.825rem',
                      fontWeight: 500,
                      color: '#0f172a',
                      backgroundColor: '#ffffff',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                    }}>
                      <span style={{ fontWeight: 700, color: '#0284c7', marginRight: '0.35rem' }}>A:</span>
                      "{turn.patientAnswer}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: DOCTOR CONSULTATION PANEL */}
          <div style={{
            position: 'sticky',
            top: '5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            
            {/* DOCTOR CONSULTATION CARD */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '2px solid #008080',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0, 101, 101, 0.08)',
            }}>
              
              {/* Doctor Profile Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '1rem',
                marginBottom: '1.25rem',
                borderBottom: '1px solid #e2e8f0',
              }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
                    Doctor Consultation Panel
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
                    Attending: <strong style={{ color: '#006565' }}>{doctorInfo.name}</strong> ({doctorInfo.department})
                  </p>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#0369a1',
                  backgroundColor: '#e0f2fe',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}>
                  <Clock size={12} /> Started 09:40 AM
                </div>
              </div>

              {/* SUCCESS BANNER IF COMPLETED */}
              {consultationStatus === 'Completed' && (
                <div style={{
                  backgroundColor: '#ecfdf5',
                  border: '1.5px solid #10b981',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1.25rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#065f46' }}>
                    <CheckCircle2 size={20} color="#059669" />
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>
                      Consultation Completed
                    </h4>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#047857', margin: 0, marginTop: '0.4rem', lineHeight: 1.4 }}>
                    Consultation session for Rahul Sharma (MK-2026-8901) marked as completed at {savedTimestamp || '09:42 AM'}. Notes recorded in local session state.
                  </p>
                </div>
              )}

              {/* SAVE CONFIRMATION TOAST BANNER */}
              {isNotesSaved && (
                <div style={{
                  backgroundColor: '#f0fdfa',
                  border: '1px solid #99f6e4',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#0f766e',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}>
                  <Check size={16} color="#0d9488" />
                  <span>Clinical notes saved successfully ({savedTimestamp})!</span>
                </div>
              )}

              {/* TEXTAREA FOR DOCTOR NOTES */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '0.5rem',
                }}>
                  Doctor Clinical Notes & Observations
                </label>

                <textarea
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="Enter your clinical notes here..."
                  rows={8}
                  disabled={consultationStatus === 'Completed'}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.9rem',
                    fontFamily: 'Inter, sans-serif',
                    color: '#0f172a',
                    backgroundColor: consultationStatus === 'Completed' ? '#f8fafc' : '#ffffff',
                    boxSizing: 'border-box',
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.5,
                  }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.75rem', color: '#64748b' }}>
                  <span>Frontend Demo State</span>
                  <span>{doctorNotes.length} characters</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                
                {/* Save Notes Button */}
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={consultationStatus === 'Completed'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#ffffff',
                    color: '#006565',
                    border: '1.5px solid #008080',
                    borderRadius: '8px',
                    padding: '0.7rem 1.25rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: consultationStatus === 'Completed' ? 'not-allowed' : 'pointer',
                    opacity: consultationStatus === 'Completed' ? 0.6 : 1,
                  }}
                >
                  <Save size={16} />
                  <span>Save Notes</span>
                </button>

                {/* Complete Consultation Button */}
                <button
                  type="button"
                  onClick={handleCompleteConsultation}
                  disabled={consultationStatus === 'Completed'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: consultationStatus === 'Completed' ? '#059669' : '#006565',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: consultationStatus === 'Completed' ? 'default' : 'pointer',
                    boxShadow: '0 4px 10px rgba(0, 101, 101, 0.2)',
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{consultationStatus === 'Completed' ? 'Consultation Completed' : 'Complete Consultation'}</span>
                </button>

                {/* Return to Clinical History / Queue */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={onBackToHistory}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '0.6rem 0.85rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back to History</span>
                  </button>

                  {onReturnToQueue && (
                    <button
                      type="button"
                      onClick={onReturnToQueue}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        backgroundColor: '#f1f5f9',
                        color: '#334155',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      <span>Return to Queue</span>
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* DEMO NOTICE BADGE */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px dashed #cbd5e1',
              borderRadius: '8px',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: '#64748b',
            }}>
              <ShieldCheck size={16} color="#0284c7" />
              <span>
                Frontend Step 3 Demo Mode • Local state simulation only. Zero backend/DB calls.
              </span>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default DoctorConsultation;
