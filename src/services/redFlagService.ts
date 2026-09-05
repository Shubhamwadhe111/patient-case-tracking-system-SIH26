/**
 * Clinical Red Flag & Urgency Detection Service Interface (Phase 1 Placeholder Contract)
 * To be fully implemented in Phase 7.
 */

import type { ClinicalHistoryData } from '../types/clinicalHistory';
import type { RedFlag } from '../types/redFlag';

export interface IRedFlagService {
  isServiceReady(): boolean;
  evaluateRedFlags(sessionId: string, history: ClinicalHistoryData): Promise<RedFlag[]>;
}

export class Phase1RedFlagService implements IRedFlagService {
  isServiceReady(): boolean {
    return false; // Phase 1 architectural contract only
  }

  async evaluateRedFlags(_sessionId: string, _history: ClinicalHistoryData): Promise<RedFlag[]> {
    throw new Error('Clinical Red-Flag & Urgency Triage detection engine is scheduled for Phase 7 implementation.');
  }
}

export const redFlagService = new Phase1RedFlagService();
