import React, { useState } from 'react';
import { 
  Stethoscope, 
  ArrowLeft, 
  User, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Play, 
  Mic, 
  Type, 
  Bot, 
  FileText,
  Calendar,
  Building2,
  Check,
  Activity
} from 'lucide-react';

export interface PatientClinicalHistoryProps {
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
  onBack: () => void;
  onStartConsultation?: () => void;
}

export interface ConversationTurn {
  order: number;
  questionId: string;
  category: string;
  questionText: string;
  patientAnswer: string;
  inputMethod: 'text' | 'voice';
  isAiGenerated?: boolean;
}

export const PatientClinicalHistory: React.FC<PatientClinicalHistoryProps> = ({ patient, onBack, onStartConsultation }) => {
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [inConsultation, setInConsultation] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // All 7 Chronological Intake Questions and Patient Answers (Mock Data)
  const conversationTimeline: ConversationTurn[] = [
    {
      order: 1,
      questionId: 'q1_chief_complaint',
      category: 'Chief Complaint',
      questionText: 'What is the main problem that brought you to the hospital today?',
      patientAnswer: 'I have had a severe headache behind my right eye for three days, and it becomes worse in the evening.',
      inputMethod: 'text',
      isAiGenerated: false,
    },
    {
      order: 2,
      questionId: 'q2_onset',
      category: 'Onset & Timing',
      questionText: 'Do you experience any associated symptoms such as nausea, sensitivity to light, or visual disturbances with this headache?',
      patientAnswer: 'It started 3 days ago on Tuesday evening. Light bothers my eyes when the pain peaks.',
      inputMethod: 'voice',
      isAiGenerated: true, // Real Phase 3C Gemini follow-up question
    },
    {
      order: 3,
      questionId: 'q3_symptom_description',
      category: 'Symptom Description',
      questionText: 'Can you describe what you are feeling and where the pain spreads?',
      patientAnswer: 'Throbbing pain focused behind the right eye, radiating towards my right temple.',
      inputMethod: 'text',
      isAiGenerated: false,
    },
    {
      order: 4,
      questionId: 'q4_severity',
      category: 'Severity',
      questionText: 'How severe is the headache on a scale of 1 to 10?',
      patientAnswer: 'It is about 7 out of 10 in the evening, making it difficult to work on screens.',
      inputMethod: 'text',
      isAiGenerated: false,
    },
    {
      order: 5,
      questionId: 'q5_prior_history',
      category: 'Prior History',
      questionText: 'Have you experienced this type of headache before?',
      patientAnswer: 'No prior history of severe headaches. This is the first time experiencing this pattern.',
      inputMethod: 'text',
      isAiGenerated: false,
    },
    {
      order: 6,
      questionId: 'q6_medications',
      category: 'Medications',
      questionText: 'Are you currently taking any medicines for this or other conditions?',
      patientAnswer: 'Took Paracetamol 650mg yesterday, which provided mild temporary relief for 2 hours.',
      inputMethod: 'text',
      isAiGenerated: false,
    },
    {
      order: 7,
      questionId: 'q7_additional_notes',
      category: 'Additional Notes',
      questionText: 'Is there anything else you think the doctor should know about your daily routine?',
      patientAnswer: 'Working long 10-hour shifts on computer screens recently without regular breaks.',
      inputMethod: 'voice',
      isAiGenerated: false,
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#111c2d',
    }}>
      
      {/* 1. TOP HEADER */}
      <header style={{
        height: '64px',
        backgroundColor: '#006565',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Queue</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
            <Stethoscope size={20} color="#ffffff" />
            <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>CareConnect Physician Portal</span>
          </div>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#e3fffe', opacity: 0.9 }}>
          Dr. Ananya Rao • General Medicine OPD Room 104
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1000px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* PATIENT PROFILE HEADER CARD */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
        }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            
            {/* Patient Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}>
                <User size={30} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.4rem', fontSize: '0.85rem', color: '#64748b' }}>
                  <span>{patient.age} yrs • {patient.gender}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Building2 size={14} />
                    {patient.department}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} />
                    Intake: Today, 09:15 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Status Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
              
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                border: '1px solid #a7f3d0',
              }}>
                <CheckCircle2 size={15} color="#059669" />
                <span>Clinical History Completed</span>
              </span>

              {isReviewed && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#0369a1',
                  backgroundColor: '#e0f2fe',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}>
                  <Check size={12} /> Reviewed by Dr. Ananya Rao
                </span>
              )}

              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#006565', marginTop: '2px' }}>
                History Progress: 7 / 7 Questions Answered (100%)
              </div>

            </div>

          </div>

          {/* Active Consultation Banner */}
          {inConsultation && (
            <div style={{
              marginTop: '1.25rem',
              padding: '0.85rem 1.25rem',
              backgroundColor: '#f0fdfa',
              border: '2px solid #008080',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Activity size={20} color="#006565" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#004f4f' }}>
                  Active Doctor Consultation in Progress with {patient.name}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#006565', fontWeight: 600 }}>
                Step 2 Demo Consultation State
              </span>
            </div>
          )}

        </div>

        {/* DOCTOR ACTION BUTTONS BAR */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            
            {/* Start Consultation Primary Button */}
            <button
              type="button"
              onClick={() => {
                setInConsultation(true);
                if (onStartConsultation) {
                  onStartConsultation();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#006565',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0, 101, 101, 0.2)',
              }}
            >
              <Play size={16} fill="#ffffff" />
              <span>{inConsultation ? 'Consultation Active' : 'Start Consultation'}</span>
            </button>

            {/* Mark as Reviewed Button */}
            <button
              type="button"
              onClick={() => setIsReviewed(!isReviewed)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: isReviewed ? '#ecfdf5' : '#ffffff',
                color: isReviewed ? '#065f46' : '#334155',
                border: isReviewed ? '1px solid #a7f3d0' : '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <CheckCircle2 size={16} color={isReviewed ? '#059669' : '#64748b'} />
              <span>{isReviewed ? 'Marked as Reviewed' : 'Mark as Reviewed'}</span>
            </button>

          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            
            {/* Print Summary Button */}
            <button
              type="button"
              onClick={() => setShowPrintModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#ffffff',
                color: '#206393',
                border: '1px solid #90c9ff',
                borderRadius: '8px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Printer size={16} />
              <span>Print / View Summary</span>
            </button>

          </div>
        </div>

        {/* 3. CLINICAL HISTORY TIMELINE CONVERSATION VIEW */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
        }}>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '1rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#006565" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
                Chronological Clinical History Transcript
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
              7 Structured Question & Answer Turns
            </span>
          </div>

          {/* Conversation Messages Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {conversationTimeline.map((item) => (
              <div 
                key={item.questionId}
                style={{
                  border: '1px solid #f1f5f9',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  backgroundColor: '#fafafa',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                
                {/* System Question Bubble */}
                <div style={{ display: 'flex', gap: '0.85rem', maxWidth: '90%' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#006565',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Bot size={22} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#006565' }}>
                        Q{item.order}. {item.category}
                      </span>

                      {item.isAiGenerated && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: '#f0fdfa',
                          color: '#006565',
                          border: '1px solid #99f6e4',
                          padding: '1px 7px',
                          borderRadius: '10px',
                        }}>
                          <Sparkles size={12} color="#006565" />
                          Phase 3C AI Follow-up Question
                        </span>
                      )}
                    </div>

                    <div style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px 12px 12px 2px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#1e293b',
                    }}>
                      {item.questionText}
                    </div>
                  </div>
                </div>

                {/* Patient Answer Bubble */}
                <div style={{ display: 'flex', gap: '0.85rem', maxWidth: '90%', alignSelf: 'flex-end', flexDirection: 'row-reverse' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#206393',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <User size={22} />
                  </div>

                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', marginBottom: '0.35rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        backgroundColor: item.inputMethod === 'voice' ? '#cff4fc' : '#f1f5f9',
                        color: item.inputMethod === 'voice' ? '#055160' : '#475569',
                        padding: '1px 7px',
                        borderRadius: '10px',
                      }}>
                        {item.inputMethod === 'voice' ? <Mic size={11} /> : <Type size={11} />}
                        {item.inputMethod === 'voice' ? 'Voice STT Input' : 'Typed Input'}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#206393' }}>
                        Patient Response
                      </span>
                    </div>

                    <div style={{
                      backgroundColor: '#f0f9ff',
                      border: '1px solid #90c9ff',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px 12px 2px 12px',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: '#0f172a',
                      textAlign: 'left',
                    }}>
                      "{item.patientAnswer}"
                    </div>
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

      </main>

      {/* PRINT SUMMARY MODAL PREVIEW */}
      {showPrintModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '2px solid #006565', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Stethoscope size={24} color="#006565" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#006565', margin: 0 }}>
                  CareConnect Patient History Summary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                style={{ backgroundColor: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>Patient:</strong> {patient.name} ({patient.patientId})<br />
                <strong>Age/Gender:</strong> {patient.age} yrs • {patient.gender}<br />
                <strong>OPD Department:</strong> {patient.department}<br />
                <strong>Reviewed By:</strong> Dr. Ananya Rao
              </div>

              <div>
                <strong style={{ color: '#006565' }}>Chief Complaint:</strong>
                <p style={{ marginTop: '0.2rem', fontStyle: 'italic' }}>"{conversationTimeline[0].patientAnswer}"</p>
              </div>

              <div>
                <strong style={{ color: '#006565' }}>Intake Summary (7 Questions):</strong>
                <ul style={{ marginTop: '0.4rem', paddingLeft: '1.25rem', lineHeight: 1.5 }}>
                  {conversationTimeline.map((item) => (
                    <li key={item.questionId} style={{ marginBottom: '0.4rem' }}>
                      <strong>{item.category}:</strong> {item.patientAnswer}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={() => {
                    alert('Print command sent to hospital printer.');
                    setShowPrintModal(false);
                  }}
                  style={{
                    backgroundColor: '#006565',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.65rem 1.25rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Confirm Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
