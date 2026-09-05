/**
 * Clinical Summary Generation Service Interface (Phase 1 Placeholder Contract)
 * To be fully implemented in Phase 5.
 */

import type { ClinicalHistoryData } from '../types/clinicalHistory';
import type { ExtractedMedicalData } from '../types/document';
import type { ClinicalSummary } from '../types/summary';

export interface IClinicalSummaryService {
  isServiceReady(): boolean;
  generateSummary(
    sessionId: string,
    history: ClinicalHistoryData,
    documentsData: ExtractedMedicalData[]
  ): Promise<ClinicalSummary>;
}

export class Phase1ClinicalSummaryService implements IClinicalSummaryService {
  isServiceReady(): boolean {
    return false; // Phase 1 architectural contract only
  }

  async generateSummary(
    _sessionId: string,
    _history: ClinicalHistoryData,
    _documentsData: ExtractedMedicalData[]
  ): Promise<ClinicalSummary> {
    throw new Error('Clinical History Synthesis & Summary generation is scheduled for Phase 5 implementation.');
  }
}

export const clinicalSummaryService = new Phase1ClinicalSummaryService();
