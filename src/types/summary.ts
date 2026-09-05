/**
 * Clinical Summary & Physician Notes Domain Models
 */

import type { ClinicalHistoryData } from './clinicalHistory';
import type { ExtractedMedicalData } from './document';
import type { RedFlag } from './redFlag';

export interface PhysicianNotes {
  doctorId: string;
  editedSummaryText?: string;
  doctorNotes?: string;
  confirmedAt?: string;
  isConfirmed: boolean;
}

export interface ClinicalSummary {
  id: string;
  sessionId: string;
  patientId: string;
  historyData: ClinicalHistoryData;
  extractedDocumentsData: ExtractedMedicalData[];
  redFlags: RedFlag[];
  generatedSummaryText: string;
  physicianNotes?: PhysicianNotes;
  generatedAt: string;
}
