import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { 
  Bot, 
  User, 
  Mic, 
  MicOff,
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw,
  Sparkles,
  Loader2,
  WifiOff
} from 'lucide-react';
import type { OnboardingData } from '../../types/onboarding';
import type { HistoryResponse, StructuredQuestion, ClinicalHistorySession, VoiceInputState } from '../../types/clinicalHistory';
import { clinicalHistorySessionService } from '../../services/clinicalHistorySessionService';
import { clinicalHistoryAIService } from '../../services/aiConversationContract';
import { VoiceInputVisualizer } from './VoiceInputVisualizer';
import { sttService } from '../../services/sttService';

export interface ClinicalHistoryConversationStepProps {
  patientData: OnboardingData;
  initialQuestionIndex?: number;
  onFinish: (responses: HistoryResponse[]) => void;
  onBackToIntro: () => void;
}

export const ClinicalHistoryConversationStep: React.FC<ClinicalHistoryConversationStepProps> = ({
  patientData,
  initialQuestionIndex = 0,
  onFinish,
  onBackToIntro,
}) => {
  const [questions, setQuestions] = useState<StructuredQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(initialQuestionIndex);
  const [session, setSession] = useState<ClinicalHistorySession | null>(null);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isFallbackActive, setIsFallbackActive] = useState<boolean>(false);

  // Phase 3D Step 2 Real STT Voice State
  const [voiceState, setVoiceState] = useState<VoiceInputState>('idle');
  const [voiceErrorMessage, setVoiceErrorMessage] = useState<string | null>(null);

  const patientId = patientData.fullName || 'default_patient';

  // Clean up STT instance on unmount
  useEffect(() => {
    return () => {
      sttService.stop();
    };
  }, []);

  // Fetch question for currentIndex using AI contract with fallback support
  const fetchQuestion = async (idx: number, currentSession: ClinicalHistorySession) => {
    setIsAiLoading(true);
    try {
      const q = await clinicalHistoryAIService.getNextQuestion(
        currentSession.sessionId,
        idx,
        patientData.fullName,
        patientData.departmentName,
        currentSession.responses
      );

      setIsFallbackActive(clinicalHistoryAIService.isFallbackActive());

      if (q) {
        setQuestions((prev) => {
          const nextQuestions = [...prev];
          nextQuestions[idx] = q;
          return nextQuestions;
        });

        // Pre-fill input if answer already exists
        const existingResp = currentSession.responses.find((r) => r.questionId === q.questionId);
        setCurrentInput(existingResp ? existingResp.answerRawText : '');
      } else if (idx >= 7) {
        setIsCompleted(true);
      }
    } catch (e) {
      console.warn('Error in fetchQuestion:', e);
      setIsFallbackActive(true);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Initial setup on mount
  useEffect(() => {
    async function init() {
      const activeSession = clinicalHistorySessionService.createOrGetSession(patientId, 7);
      setSession(activeSession);

      const startIdx = Math.min(initialQuestionIndex, 6);
      setCurrentIndex(startIdx);

      fetchQuestion(startIdx, activeSession);
    }
    init();
  }, [patientId, initialQuestionIndex]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = 7;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  // Build helper map of answers from session
  const answersMap: Record<string, string> = {};
  if (session) {
    session.responses.forEach((r) => {
      answersMap[r.questionId] = r.answerRawText;
    });
  }

  const handleContinue = async () => {
    if (isAiLoading) return;

    // Stop active STT when advancing
    sttService.stop();
    if (voiceState !== 'idle') {
      setVoiceState('idle');
    }

    const trimmed = currentInput.trim();
    if (!trimmed) {
      setValidationError('Please enter your answer before continuing.');
      return;
    }

    setValidationError(null);
    if (!currentQuestion) return;

    const nextIdx = currentIndex + 1;

    // Save/update response with deduplication in local storage service
    const updatedSession = clinicalHistorySessionService.saveOrUpdateResponse(
      session?.sessionId || 'sess_default',
      patientId,
      currentQuestion.questionId,
      currentQuestion.questionText,
      currentQuestion.category,
      trimmed,
      'text',
      nextIdx
    );

    setSession(updatedSession);

    if (nextIdx < totalQuestions) {
      setCurrentIndex(nextIdx);
      await fetchQuestion(nextIdx, updatedSession);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = async () => {
    if (isAiLoading) return;
    setValidationError(null);

    // Stop active STT when navigating back
    sttService.stop();
    if (voiceState !== 'idle') {
      setVoiceState('idle');
    }

    // Save current input draft if non-empty
    if (currentInput.trim() && currentQuestion && session) {
      clinicalHistorySessionService.saveOrUpdateResponse(
        session.sessionId,
        patientId,
        currentQuestion.questionId,
        currentQuestion.questionText,
        currentQuestion.category,
        currentInput.trim(),
        'text',
        currentIndex
      );
    }

    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      if (session) {
        fetchQuestion(prevIdx, session);
      }
    } else {
      onBackToIntro();
    }
  };

  // Phase 3D Step 2 Real Web Speech STT Handlers
  const startVoiceRecognition = () => {
    if (!sttService.isSupported()) {
      setVoiceState('unsupported');
      setVoiceErrorMessage('Speech Recognition API is not supported in this browser. Please use Chrome, Edge, or type your answer.');
      return;
    }

    setVoiceState('preparing');
    setVoiceErrorMessage(null);

    sttService.start({
      onStart: () => {
        setVoiceState('listening');
      },
      onResult: (transcript, _isFinal) => {
        setCurrentInput(transcript);
        if (validationError && transcript.trim()) {
          setValidationError(null);
        }
      },
      onError: (errorMsg) => {
        setVoiceErrorMessage(errorMsg);
        setVoiceState('error');
      },
      onEnd: () => {
        setVoiceState((prev) => (prev === 'listening' || prev === 'preparing' ? 'stopped' : prev));
      },
    });
  };

  const handleMicClick = () => {
    if (voiceState === 'listening' || voiceState === 'preparing') {
      sttService.stop();
      setVoiceState('stopped');
    } else {
      startVoiceRecognition();
    }
  };

  const handleStopListening = () => {
    sttService.stop();
    setVoiceState('stopped');
  };

  const handleStartListening = () => {
    startVoiceRecognition();
  };

  const handleResetVoiceState = () => {
    sttService.stop();
    setVoiceState('idle');
    setVoiceErrorMessage(null);
  };

  const handleFinalSubmit = () => {
    sttService.stop();
    const completedSession = clinicalHistorySessionService.completeSession(patientId);
    onFinish(completedSession.responses);
  };

  const handleResetConversation = () => {
    sttService.stop();
    setCurrentIndex(0);
    setVoiceState('idle');
    if (session) {
      fetchQuestion(0, session);
    }
    setIsCompleted(false);
  };

  if (!currentQuestion && !isCompleted) {
    return (
      <Card style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Loader2 size={36} color="var(--color-brand-teal-600)" style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: 'var(--font-size-md)', fontWeight: 600, color: 'var(--color-slate-700)' }}>
          CareConnect is preparing the next question...
        </p>
      </Card>
    );
  }

  // Render Completed View
  if (isCompleted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        <Card style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
          border: '2px solid var(--color-success-600)',
          boxShadow: 'var(--shadow-md)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              background: 'var(--color-success-600)',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CheckCircle2 size={28} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-slate-900)' }}>
                Clinical History Completed
              </h2>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success-700)', fontWeight: 600 }}>
                Phase 3C Real AI Active • Phase 3D Real Speech-to-Text Connected
              </p>
            </div>
          </div>

          {/* Collected Responses List */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-slate-200)',
            padding: '1.25rem',
            margin: '1.25rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-slate-700)' }}>
              Summary of Answers for Doctor Review:
            </h3>

            {questions.filter(Boolean).map((q, idx) => (
              <div key={q.questionId} style={{
                borderBottom: idx < questions.length - 1 ? '1px solid var(--color-slate-100)' : 'none',
                paddingBottom: '0.75rem',
              }}>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-brand-teal-700)' }}>
                  Q{idx + 1}. {q.questionText}
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-slate-800)', marginTop: '0.25rem', fontStyle: answersMap[q.questionId] ? 'normal' : 'italic' }}>
                  {answersMap[q.questionId] ? `"${answersMap[q.questionId]}"` : 'No answer provided'}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              variant="secondary"
              icon={<RotateCcw size={18} />}
              onClick={handleResetConversation}
            >
              Edit Answers
            </Button>

            <Button
              variant="primary"
              icon={<CheckCircle2 size={20} />}
              onClick={handleFinalSubmit}
              style={{ padding: '0.75rem 2rem', fontWeight: 700 }}
            >
              Complete History Session
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '850px', margin: '0 auto' }}>
      
      {/* Top Header Bar & Progress */}
      <Card style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 800 }}>Clinical History Conversation</h2>
              <Badge variant="info">{isFallbackActive ? 'AI Fallback Active' : 'Phase 3C Real AI'}</Badge>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
              Patient: <strong>{patientData.fullName || 'Rahul Sharma'}</strong> • OPD: {patientData.departmentName}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-brand-teal-700)' }}>
              Question {currentIndex + 1} of {totalQuestions}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
              {progressPercent}% Completed
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'var(--color-slate-100)',
          borderRadius: '5px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: 'var(--color-brand-teal-600)',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </Card>

      {/* Main Conversation Area */}
      <Card style={{
        padding: '1.5rem',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-md)',
      }}>
        
        {/* Chat History Messages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', maxHeight: '280px', paddingRight: '0.5rem' }}>
          
          {/* Fallback Banner if API unavailable */}
          {isFallbackActive ? (
            <div style={{
              padding: '0.65rem 0.85rem',
              backgroundColor: '#fffbe6',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #ffe58f',
              fontSize: 'var(--font-size-xs)',
              color: '#873800',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <WifiOff size={16} color="#d46b08" style={{ flexShrink: 0 }} />
              <span>Unable to connect to the AI service. Continuing with standard clinical history questions.</span>
            </div>
          ) : (
            <div style={{
              padding: '0.6rem 0.85rem',
              backgroundColor: 'var(--color-slate-50)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-slate-200)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <Sparkles size={16} color="var(--color-brand-teal-600)" />
              <span>Real AI Conversation Engine Active • Information Intake Mode Only</span>
            </div>
          )}

          {/* Previous Questions & Answers */}
          {questions.slice(0, currentIndex).filter(Boolean).map((q, idx) => (
            <React.Fragment key={q.questionId}>
              {/* Previous Question */}
              <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '85%' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-brand-teal-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Bot size={20} color="#ffffff" />
                </div>
                <div style={{
                  backgroundColor: 'var(--color-slate-100)',
                  padding: '0.85rem 1.1rem',
                  borderRadius: '16px 16px 16px 2px',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-slate-800)',
                }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, display: 'block', color: 'var(--color-brand-teal-700)', marginBottom: '2px' }}>
                    CareConnect Question {idx + 1}
                  </span>
                  {q.questionText}
                </div>
              </div>

              {/* Previous Patient Answer */}
              {answersMap[q.questionId] && (
                <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '85%', alignSelf: 'flex-end', flexDirection: 'row-reverse' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-brand-blue-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <User size={20} color="#ffffff" />
                  </div>
                  <div style={{
                    backgroundColor: 'var(--color-brand-blue-50)',
                    border: '1px solid var(--color-brand-blue-200)',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '16px 16px 2px 16px',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-slate-900)',
                    fontWeight: 500,
                  }}>
                    {answersMap[q.questionId]}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Current Question Bubble or AI Loading Indicator */}
          {isAiLoading ? (
            <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '85%', alignItems: 'center' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-brand-teal-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Loader2 size={24} color="#ffffff" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
              <div style={{
                backgroundColor: '#f0fdfa',
                border: '1px dashed var(--color-brand-teal-500)',
                padding: '0.85rem 1.25rem',
                borderRadius: '20px 20px 20px 4px',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-brand-teal-800)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span>CareConnect is preparing the next question...</span>
              </div>
            </div>
          ) : currentQuestion ? (
            <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '90%' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-brand-teal-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(15, 118, 110, 0.3)',
              }}>
                <Bot size={24} color="#ffffff" />
              </div>
              <div style={{
                backgroundColor: '#f0fdfa',
                border: '2px solid var(--color-brand-teal-500)',
                padding: '1.1rem 1.3rem',
                borderRadius: '20px 20px 20px 4px',
                fontSize: 'var(--font-size-md)',
                fontWeight: 600,
                color: 'var(--color-slate-900)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 800, display: 'block', color: 'var(--color-brand-teal-700)', marginBottom: '4px' }}>
                  CURRENT QUESTION ({currentIndex + 1} / {totalQuestions})
                </span>
                {currentQuestion.questionText}
              </div>
            </div>
          ) : null}

        </div>

        {/* Validation Warning Alert */}
        {validationError && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            color: '#991b1b',
            fontSize: 'var(--font-size-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
          }}>
            <AlertCircle size={18} color="#dc2626" style={{ flexShrink: 0 }} />
            <span>{validationError}</span>
          </div>
        )}

        {/* Phase 3D Step 2 Voice Input Visualizer Component */}
        <VoiceInputVisualizer
          voiceState={voiceState}
          errorMessage={voiceErrorMessage}
          onStopListening={handleStopListening}
          onStartListening={handleStartListening}
          onResetState={handleResetVoiceState}
        />

        {/* Patient Response Input Area */}
        <div style={{
          backgroundColor: 'var(--color-slate-50)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-slate-300)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-slate-700)' }}>
            Your Answer:
          </label>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <textarea
              value={currentInput}
              onChange={(e) => {
                setCurrentInput(e.target.value);
                if (validationError && e.target.value.trim()) {
                  setValidationError(null);
                }
              }}
              disabled={isAiLoading}
              placeholder={currentQuestion?.placeholderText || 'Type your answer or click microphone to speak...'}
              rows={3}
              style={{
                flex: 1,
                padding: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: validationError ? '2px solid #dc2626' : voiceState === 'listening' ? '2px solid #06b6d4' : '1px solid var(--color-slate-300)',
                fontSize: 'var(--font-size-md)',
                fontFamily: 'inherit',
                resize: 'none',
                outline: 'none',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                opacity: isAiLoading ? 0.6 : 1,
              }}
            />

            {/* Microphone Button (Triggers Browser Speech Recognition) */}
            <button
              type="button"
              onClick={handleMicClick}
              disabled={isAiLoading}
              title={voiceState === 'listening' ? 'Stop Recording' : 'Start Speech Recognition'}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: voiceState === 'listening' ? '#0891b2' : voiceState === 'stopped' ? '#f1f5f9' : '#ffffff',
                border: voiceState === 'listening' ? '2px solid #06b6d4' : '2px solid var(--color-slate-300)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isAiLoading ? 'not-allowed' : 'pointer',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                opacity: isAiLoading ? 0.6 : 1,
                boxShadow: voiceState === 'listening' ? '0 0 12px rgba(8, 145, 178, 0.4)' : 'none',
              }}
            >
              {voiceState === 'preparing' ? (
                <Loader2 size={24} color="var(--color-brand-teal-600)" style={{ animation: 'spin 1s linear infinite' }} />
              ) : voiceState === 'listening' ? (
                <Mic size={24} color="#ffffff" />
              ) : voiceState === 'stopped' ? (
                <MicOff size={24} color="var(--color-slate-500)" />
              ) : (
                <Mic size={24} color="var(--color-slate-500)" />
              )}
            </button>
          </div>

          {/* Action Navigation Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <Button
              variant="secondary"
              icon={<ArrowLeft size={18} />}
              onClick={handlePrevious}
              disabled={isAiLoading}
            >
              {currentIndex === 0 ? 'Intro' : 'Back'}
            </Button>

            <Button
              variant="primary"
              icon={isAiLoading ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <ArrowRight size={20} />}
              onClick={handleContinue}
              disabled={isAiLoading}
              style={{
                minHeight: '48px',
                padding: '0 2rem',
                fontSize: 'var(--font-size-md)',
                fontWeight: 700,
                opacity: isAiLoading ? 0.7 : 1,
              }}
            >
              {isAiLoading ? 'Preparing...' : currentIndex < totalQuestions - 1 ? 'Continue' : 'Finish History'}
            </Button>
          </div>
        </div>

      </Card>
    </div>
  );
};
