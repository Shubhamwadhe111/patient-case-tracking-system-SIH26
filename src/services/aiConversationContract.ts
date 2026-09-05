/**
 * Prototype AI Clinical History Conversation Service Contract & Implementations (Phase 3C)
 * 
 * Includes:
 * 1. IClinicalHistoryAIService Interface
 * 2. MockClinicalHistoryAIService (Development & Safe Fallback Provider)
 * 3. RealClinicalHistoryAIService (Real AI Provider with Automatic Fallback)
 */

import type { StructuredQuestion, HistoryResponse } from '../types/clinicalHistory';

export interface IClinicalHistoryAIService {
  isAvailable(): boolean;
  isFallbackActive(): boolean;
  getQuestions(): Promise<StructuredQuestion[]>;
  getNextQuestion(
    sessionId: string, 
    currentIndex: number, 
    patientName?: string, 
    departmentName?: string,
    history?: HistoryResponse[]
  ): Promise<StructuredQuestion | null>;
  processPatientResponse(sessionId: string, questionId: string, responseText: string): Promise<boolean>;
}

export const MOCK_STRUCTURED_QUESTIONS: StructuredQuestion[] = [
  {
    questionId: 'q1_chief_complaint',
    questionText: 'What is the main problem that brought you to the hospital today?',
    category: 'chief_complaint',
    questionOrder: 1,
    responseType: 'text',
    placeholderText: 'e.g., I have been having chest pain and feeling breathless...',
  },
  {
    questionId: 'q2_onset',
    questionText: 'When did this problem start?',
    category: 'onset',
    questionOrder: 2,
    responseType: 'text',
    placeholderText: 'e.g., Started 2 days ago, worse since this morning...',
  },
  {
    questionId: 'q3_symptom_description',
    questionText: 'Can you describe what you are feeling?',
    category: 'symptom_description',
    questionOrder: 3,
    responseType: 'text',
    placeholderText: 'e.g., Sharp pain on the left side, radiates to neck...',
  },
  {
    questionId: 'q4_severity',
    questionText: 'How severe is the problem?',
    category: 'severity',
    questionOrder: 4,
    responseType: 'text',
    placeholderText: 'e.g., Moderate to severe pain, limits walking...',
  },
  {
    questionId: 'q5_prior_history',
    questionText: 'Have you experienced this problem before?',
    category: 'prior_history',
    questionOrder: 5,
    responseType: 'text',
    placeholderText: 'e.g., Had a similar episode 6 months ago...',
  },
  {
    questionId: 'q6_medications',
    questionText: 'Are you currently taking any medicines?',
    category: 'medications',
    questionOrder: 6,
    responseType: 'text',
    placeholderText: 'e.g., Taking BP medication (Amlodipine 5mg daily)...',
  },
  {
    questionId: 'q7_additional_notes',
    questionText: 'Is there anything else you think the doctor should know?',
    category: 'additional_notes',
    questionOrder: 7,
    responseType: 'text',
    placeholderText: 'e.g., Allergic to Penicillin, blood pressure fluctuates...',
  },
];

export class MockClinicalHistoryAIService implements IClinicalHistoryAIService {
  public isAvailable(): boolean {
    return true;
  }

  public isFallbackActive(): boolean {
    return true;
  }

  public async getQuestions(): Promise<StructuredQuestion[]> {
    return MOCK_STRUCTURED_QUESTIONS;
  }

  public async getNextQuestion(
    _sessionId: string, 
    currentIndex: number
  ): Promise<StructuredQuestion | null> {
    if (currentIndex >= 0 && currentIndex < MOCK_STRUCTURED_QUESTIONS.length) {
      return MOCK_STRUCTURED_QUESTIONS[currentIndex];
    }
    return null;
  }

  public async processPatientResponse(_sessionId: string, _questionId: string, _responseText: string): Promise<boolean> {
    return true;
  }
}

export class RealClinicalHistoryAIService implements IClinicalHistoryAIService {
  private fallbackProvider: MockClinicalHistoryAIService;
  private fallbackActive: boolean = false;

  constructor() {
    this.fallbackProvider = new MockClinicalHistoryAIService();
  }

  public isAvailable(): boolean {
    return true;
  }

  public isFallbackActive(): boolean {
    return this.fallbackActive;
  }

  public async getQuestions(): Promise<StructuredQuestion[]> {
    return MOCK_STRUCTURED_QUESTIONS;
  }

  public async getNextQuestion(
    sessionId: string,
    currentIndex: number,
    patientName?: string,
    departmentName?: string,
    history?: HistoryResponse[]
  ): Promise<StructuredQuestion | null> {
    // If index exceeds fallback list, complete
    if (currentIndex >= MOCK_STRUCTURED_QUESTIONS.length) {
      return null;
    }

    try {
      // Build conversation payload
      const conversationHistory = (history || []).map((h) => ({
        questionId: h.questionId,
        questionText: h.questionText,
        category: h.category,
        patientAnswer: h.answerRawText,
      }));

      // Call backend AI proxy endpoint
      const response = await fetch('/api/ai/clinical-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          departmentName,
          currentIndex,
          totalQuestions: MOCK_STRUCTURED_QUESTIONS.length,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server endpoint HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.question) {
        this.fallbackActive = false;
        return data.question;
      }

      throw new Error(data.error || 'AI endpoint returned unsuccessful status');
    } catch (e) {
      // Safe non-crashing fallback to Mock Provider
      this.fallbackActive = true;
      return this.fallbackProvider.getNextQuestion(sessionId, currentIndex);
    }
  }

  public async processPatientResponse(_sessionId: string, _questionId: string, _responseText: string): Promise<boolean> {
    return true;
  }
}

export const mockClinicalHistoryAIService = new MockClinicalHistoryAIService();
export const realClinicalHistoryAIService = new RealClinicalHistoryAIService();

// Default exported active AI service
export const clinicalHistoryAIService: IClinicalHistoryAIService = realClinicalHistoryAIService;
