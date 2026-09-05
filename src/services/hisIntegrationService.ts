/**
 * Hospital Information System (HIS / EMR) Integration Service Interface (Phase 1 Placeholder Contract)
 * To be fully implemented in Phase 8.
 */

import type { ClinicalSummary } from '../types/summary';

export interface HISPushResult {
  success: boolean;
  hisEncounterId?: string;
  pushedAt?: string;
  errorMessage?: string;
}

export interface IHISIntegrationService {
  isConfigured(): boolean;
  pushClinicalSummaryToHIS(summary: ClinicalSummary): Promise<HISPushResult>;
}

export class Phase1HISIntegrationService implements IHISIntegrationService {
  isConfigured(): boolean {
    return false; // Phase 1 architectural contract only
  }

  async pushClinicalSummaryToHIS(_summary: ClinicalSummary): Promise<HISPushResult> {
    throw new Error('Hospital Information System (HIS/EMR) push pipeline is scheduled for Phase 8 implementation.');
  }
}

export const hisIntegrationService = new Phase1HISIntegrationService();
