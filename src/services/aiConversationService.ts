/**
 * AI Conversational History Interface (Phase 1 Placeholder Contract)
 * To be fully implemented in Phase 3.
 */

export interface AIQuestion {
  questionId: string;
  category: 'CHIEF_COMPLAINT' | 'HPI' | 'PMH' | 'SURGICAL' | 'DRUG' | 'FAMILY' | 'PERSONAL' | 'ROS' | 'AYUSH';
  questionText: Record<string, string>; // Language code mapped (e.g. { en: "What brings you to the hospital?", hi: "आपको क्या समस्या है?" })
  inputType: 'VOICE_OR_TOUCH' | 'SELECT_OPTION' | 'SLIDER' | 'DATE';
  options?: Array<{ id: string; label: Record<string, string> }>;
}

export interface IAIConversationService {
  isAvailable(): boolean;
  getInitialQuestion(languageCode: string): Promise<AIQuestion>;
  getNextAdaptiveQuestion(sessionId: string, previousAnswerRaw: string): Promise<AIQuestion | null>;
}

export class Phase1AIConversationService implements IAIConversationService {
  isAvailable(): boolean {
    return false; // Phase 1 architectural contract only
  }

  async getInitialQuestion(_languageCode: string): Promise<AIQuestion> {
    throw new Error('AI Clinical Interview service is scheduled for Phase 3 implementation.');
  }

  async getNextAdaptiveQuestion(_sessionId: string, _previousAnswerRaw: string): Promise<AIQuestion | null> {
    throw new Error('AI Adaptive Questioning engine is scheduled for Phase 3 implementation.');
  }
}

export const aiConversationService = new Phase1AIConversationService();
