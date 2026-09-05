/**
 * Clinical Red Flag & Triage Alert Domain Models
 */

export type RedFlagSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type RedFlagCategory = 
  | 'CARDIOVASCULAR'
  | 'RESPIRATORY'
  | 'NEUROLOGICAL'
  | 'ALLERGY'
  | 'VITAL_ABNORMALITY'
  | 'DRUG_INTERACTION'
  | 'OTHER';

export interface RedFlag {
  id: string;
  sessionId: string;
  severity: RedFlagSeverity;
  category: RedFlagCategory;
  title: string;
  description: string;
  sourceType: 'INTERVIEW' | 'DOCUMENT' | 'VITAL_INPUT';
  recommendedAction?: string;
  detectedAt: string;
}
