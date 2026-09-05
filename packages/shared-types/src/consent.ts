/**
 * Consent & Privacy Domain Models
 */

export interface ConsentRecord {
  id: string;
  patientId: string;
  sessionId: string;
  isAiProcessingAllowed: boolean;
  isDocumentOcrAllowed: boolean;
  isDoctorSharingAllowed: boolean;
  languageVersion: string;
  grantedAt: string;
  ipAddressOrKioskId?: string;
}
