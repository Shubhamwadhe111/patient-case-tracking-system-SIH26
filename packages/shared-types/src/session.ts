/**
 * Clinical Session & Workflow State Domain Models
 */

export type SessionStatus = 
  | 'INITIATED'
  | 'CONSENT_GRANTED'
  | 'HISTORY_IN_PROGRESS'
  | 'DOCUMENTS_UPLOADING'
  | 'SUMMARY_READY'
  | 'DOCTOR_REVIEWING'
  | 'COMPLETED'
  | 'CANCELLED';

export interface ClinicalSession {
  id: string;
  patientId: string;
  doctorId?: string;
  departmentId?: string;
  status: SessionStatus;
  startedAt: string;
  completedAt?: string;
  kioskDeviceId?: string;
  languageCode: string;
}
