/**
 * Medical Document & OCR Extraction Domain Models
 */

export type MedicalDocumentType = 
  | 'PRESCRIPTION'
  | 'LAB_REPORT'
  | 'DISCHARGE_SUMMARY'
  | 'RADIOLOGY'
  | 'OTHER';

export interface MedicalDocument {
  id: string;
  sessionId: string;
  patientId: string;
  documentType: MedicalDocumentType;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  uploadedAt: string;
  ocrProcessed: boolean;
}

export interface ExtractedEntity {
  id: string;
  category: 'MEDICATION' | 'DIAGNOSIS' | 'LAB_VALUE' | 'PROCEDURE' | 'DATE';
  entityValue: string;
  dosageOrUnit?: string;
  confidenceScore: number;
  isAbnormal?: boolean;
}

export interface ExtractedMedicalData {
  id: string;
  documentId: string;
  rawText: string;
  extractedEntities: ExtractedEntity[];
  extractedDiagnosis: string[];
  extractedMedications: Array<{ name: string; dosage?: string; frequency?: string }>;
  extractedLabValues: Array<{ testName: string; resultValue: string; unit?: string; isAbnormal: boolean }>;
  documentDate?: string;
  processedAt: string;
}

export interface MedicalTimelineEvent {
  id: string;
  patientId: string;
  eventDate: string;
  eventType: 'DIAGNOSIS' | 'SURGERY' | 'PRESCRIPTION' | 'LAB_RESULT' | 'DISCHARGE';
  title: string;
  description: string;
  sourceDocumentId?: string;
}
