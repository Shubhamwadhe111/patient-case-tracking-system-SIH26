/**
 * Database Models & Repository Abstraction Interfaces
 */

import type { User } from '../packages/shared-types/src/auth';
import type { PatientProfile } from '../packages/shared-types/src/patient';
import type { DoctorProfile, Department } from '../packages/shared-types/src/doctor';
import type { ClinicalSession } from '../packages/shared-types/src/session';
import type { HistoryResponse } from '../packages/shared-types/src/clinicalHistory';
import type { MedicalDocument, ExtractedMedicalData } from '../packages/shared-types/src/document';
import type { ClinicalSummary } from '../packages/shared-types/src/summary';
import type { RedFlag } from '../packages/shared-types/src/redFlag';
import type { ConsentRecord } from '../packages/shared-types/src/consent';

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
