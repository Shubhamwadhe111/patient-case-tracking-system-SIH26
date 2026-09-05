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
  languageCode: string;
  identificationType: 'NEW' | 'EXISTING_ABHA' | 'DEMO';
  abhaIdInput?: string;
  isAbhaVerifiedMock?: boolean;
  fullName: string;
  age: string;
  gender: Gender;
  phone: string;
  isConsentGiven: boolean;
  consentTimestamp?: string;
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
