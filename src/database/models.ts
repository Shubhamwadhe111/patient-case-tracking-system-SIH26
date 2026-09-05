/**
 * Database Models & Repository Abstraction Interfaces (Phase 1)
 */

import type { User } from '../types/auth';
import type { PatientProfile } from '../types/patient';
import type { DoctorProfile, Department } from '../types/doctor';
import type { ClinicalSession } from '../types/session';
import type { HistoryResponse } from '../types/clinicalHistory';
import type { MedicalDocument, ExtractedMedicalData } from '../types/document';
import type { ClinicalSummary } from '../types/summary';
import type { RedFlag } from '../types/redFlag';
import type { ConsentRecord } from '../types/consent';

export interface DatabaseRepositories {
  users: {
    findById(id: string): Promise<User | null>;
    create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  };
  patients: {
    findById(id: string): Promise<PatientProfile | null>;
    findByAbhaId(abhaId: string): Promise<PatientProfile | null>;
  };
  doctors: {
    findById(id: string): Promise<DoctorProfile | null>;
    listByDepartment(departmentId: string): Promise<DoctorProfile[]>;
  };
  departments: {
    listAll(): Promise<Department[]>;
  };
  sessions: {
    findById(id: string): Promise<ClinicalSession | null>;
    create(patientId: string, kioskId?: string): Promise<ClinicalSession>;
  };
  responses: {
    logResponse(response: Omit<HistoryResponse, 'id' | 'timestamp'>): Promise<HistoryResponse>;
  };
  documents: {
    listBySession(sessionId: string): Promise<MedicalDocument[]>;
  };
  extractedData: {
    findByDocument(documentId: string): Promise<ExtractedMedicalData | null>;
  };
  summaries: {
    findBySession(sessionId: string): Promise<ClinicalSummary | null>;
  };
  redFlags: {
    listBySession(sessionId: string): Promise<RedFlag[]>;
  };
  consents: {
    recordConsent(consent: Omit<ConsentRecord, 'id' | 'grantedAt'>): Promise<ConsentRecord>;
  };
}
