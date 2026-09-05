/**
 * CareConnect Clinical History Session Service (Web Prototype Demonstrator Persistence)
 * Note: Scoped for browser prototype demonstrator via localStorage.
 */

import type { 
  ClinicalHistorySession, 
  HistoryResponse 
} from '../types/clinicalHistory';

const STORAGE_PREFIX = 'careconnect_session_';

class ClinicalHistorySessionService {
  private inMemoryCache: Record<string, ClinicalHistorySession> = {};

  private getStorageKey(patientId: string): string {
    const cleanId = patientId || 'default_patient';
    return `${STORAGE_PREFIX}${cleanId}`;
  }

  /**
   * Retrieves an existing session from localStorage / memory cache
   */
  public getSession(patientId: string): ClinicalHistorySession | null {
    const key = this.getStorageKey(patientId);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item) as ClinicalHistorySession;
          this.inMemoryCache[key] = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('LocalStorage read error in ClinicalHistorySessionService:', e);
    }

    return this.inMemoryCache[key] || null;
  }

  /**
   * Checks if an incomplete (in_progress) session exists for the patient
   */
  public getIncompleteSession(patientId: string): ClinicalHistorySession | null {
    const session = this.getSession(patientId);
    if (session && session.status === 'in_progress') {
      return session;
    }
    return null;
  }

  /**
   * Creates a new clinical session or returns the active in_progress session
   */
  public createOrGetSession(patientId: string, totalQuestions: number = 7): ClinicalHistorySession {
    const existing = this.getIncompleteSession(patientId);
    if (existing) {
      return existing;
    }

    const now = new Date().toISOString();
    const newSession: ClinicalHistorySession = {
      sessionId: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      patientId: patientId || 'demo_patient_001',
      startedAt: now,
      updatedAt: now,
      currentQuestionIndex: 0,
      totalQuestions,
      status: 'in_progress',
      responses: [],
    };

    this.saveSession(newSession);
    return newSession;
  }

  /**
   * Saves or updates a patient response (deduplicates by questionId) and updates session state
   */
  public saveOrUpdateResponse(
    sessionId: string,
    patientId: string,
    questionId: string,
    questionText: string,
    category: string,
    answerRawText: string,
    inputMethod: 'text' | 'voice' = 'text',
    nextQuestionIndex: number
  ): ClinicalHistorySession {
    let session = this.getSession(patientId) || this.createOrGetSession(patientId);
    if (session.sessionId !== sessionId) {
      // Re-fetch by session if ID matches
      session = { ...session, sessionId };
    }

    const now = new Date().toISOString();

    // Check if response for this questionId already exists (Deduplication / Edit handling)
    const existingIdx = session.responses.findIndex((r) => r.questionId === questionId);

    const newResponse: HistoryResponse = {
      id: existingIdx >= 0 ? session.responses[existingIdx].id : `resp_${questionId}_${Date.now()}`,
      sessionId,
      questionId,
      questionText,
      category,
      answerRawText,
      inputMethod,
      timestamp: now,
    };

    let updatedResponses: HistoryResponse[];
    if (existingIdx >= 0) {
      updatedResponses = [...session.responses];
      updatedResponses[existingIdx] = newResponse;
    } else {
      updatedResponses = [...session.responses, newResponse];
    }

    const updatedSession: ClinicalHistorySession = {
      ...session,
      currentQuestionIndex: nextQuestionIndex,
      updatedAt: now,
      responses: updatedResponses,
    };

    this.saveSession(updatedSession);
    return updatedSession;
  }

  /**
   * Marks session status as completed
   */
  public completeSession(patientId: string): ClinicalHistorySession {
    const session = this.getSession(patientId);
    if (!session) {
      throw new Error(`No active session found for patient ${patientId}`);
    }

    const now = new Date().toISOString();
    const completedSession: ClinicalHistorySession = {
      ...session,
      status: 'completed',
      updatedAt: now,
    };

    this.saveSession(completedSession);
    return completedSession;
  }

  /**
   * Clears saved session (e.g. for Start Fresh)
   */
  public clearSession(patientId: string): void {
    const key = this.getStorageKey(patientId);
    delete this.inMemoryCache[key];
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn('LocalStorage remove error in ClinicalHistorySessionService:', e);
    }
  }

  /**
   * Internal helper to persist session object
   */
  private saveSession(session: ClinicalHistorySession): void {
    const key = this.getStorageKey(session.patientId);
    this.inMemoryCache[key] = session;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(session));
      }
    } catch (e) {
      console.warn('LocalStorage write error in ClinicalHistorySessionService:', e);
    }
  }
}

export const clinicalHistorySessionService = new ClinicalHistorySessionService();
