/**
 * Patient Onboarding State Domain Models (Phase 2)
 */

import type { Gender } from './patient';

export type OnboardingStep = 
  | 'WELCOME'
  | 'LANGUAGE'
  | 'IDENTIFICATION'
  | 'PROFILE'
  | 'CONSENT'
  | 'DEPARTMENT'
  | 'READY'
  | 'CLINICAL_HISTORY_INTRO'
  | 'CLINICAL_HISTORY_CONVERSATION';

export interface OnboardingData {
  // Step 1: Language
  languageCode: string;
  
  // Step 2: Identification
  identificationType: 'NEW' | 'EXISTING_ABHA' | 'DEMO';
  abhaIdInput?: string;
  isAbhaVerifiedMock?: boolean;
  
  // Step 3: Profile
  fullName: string;
  age: string;
  gender: Gender;
  phone: string;
  
  // Step 4: Consent
  isConsentGiven: boolean;
  consentTimestamp?: string;

  // Step 5: Department
  departmentId: string;
  departmentName: string;
}

export const DEFAULT_ONBOARDING_DATA: OnboardingData = {
  languageCode: 'en',
  identificationType: 'NEW',
  abhaIdInput: '',
  isAbhaVerifiedMock: false,
  fullName: '',
  age: '',
  gender: 'MALE',
  phone: '',
  isConsentGiven: false,
  departmentId: 'gen-med',
  departmentName: 'General Medicine',
};

export const DEMO_PATIENT_PRESET: OnboardingData = {
  languageCode: 'en',
  identificationType: 'DEMO',
  abhaIdInput: '91-8273-4920-1102',
  isAbhaVerifiedMock: true,
  fullName: 'Rahul Sharma',
  age: '46',
  gender: 'MALE',
  phone: '9876543210',
  isConsentGiven: true,
  consentTimestamp: new Date().toISOString(),
  departmentId: 'gen-med',
  departmentName: 'General Medicine',
};
