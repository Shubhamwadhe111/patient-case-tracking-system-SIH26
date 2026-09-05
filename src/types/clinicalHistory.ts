/**
 * Clinical History Data Models (Chief Complaint, HPI, PMH, Drug, Family, ROS & AYUSH)
 */

export interface ChiefComplaintItem {
  id: string;
  symptom: string;
  durationValue: number;
  durationUnit: 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';
  severity: 'MILD' | 'MODERATE' | 'SEVERE';
  isPrimary: boolean;
}

export interface HPIDetails {
  onset: 'SUDDEN' | 'GRADUAL';
  progression: 'IMPROVING' | 'WORSENING' | 'CONSTANT' | 'INTERMITTENT';
  aggravatingFactors: string[];
  relievingFactors: string[];
  associatedSymptoms: string[];
  freeTextNotes?: string;
}

export interface PastMedicalHistoryItem {
  condition: string;
  diagnosedYear?: number;
  isCurrentlyUnderTreatment: boolean;
  notes?: string;
}

export interface SurgicalHistoryItem {
  procedureName: string;
  approximateYear?: number;
  hospitalName?: string;
  complications?: string;
}

export interface MedicationItem {
  drugName: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  isCurrentlyTaking: boolean;
  sourceDocumentId?: string;
}

export interface AllergyItem {
  allergen: string;
  reactionType?: string;
  severity: 'MILD' | 'MODERATE' | 'SEVERE' | 'LIFE_THREATENING';
}

export interface FamilyMedicalHistoryItem {
  relation: string;
  condition: string;
}

export interface PersonalSocialHistory {
  diet: 'VEGETARIAN' | 'NON_VEGETARIAN' | 'EGGITARIAN' | 'VEGAN' | 'OTHER';
  smoking: 'NEVER' | 'FORMER' | 'CURRENT';
  alcohol: 'NEVER' | 'OCCASIONAL' | 'REGULAR';
  occupation?: string;
}

export interface ReviewOfSystemsItem {
  system: 'CARDIOVASCULAR' | 'RESPIRATORY' | 'GASTROINTESTINAL' | 'NEUROLOGICAL' | 'MUSCULOSKELETAL' | 'DERMATOLOGICAL' | 'GENITOURINARY' | 'OTHER';
  symptomName: string;
  isPresent: boolean;
  notes?: string;
}

/**
 * AYUSH Dashavidha Pariksha Domain Model (Phase 7 Schema Foundation)
 */
export interface DashavidhaParikshaItem {
  dushyam?: string;
  desham?: string;
  balam?: string;
  kalam?: string;
  anala?: string;
  prakriti?: string;
  vaya?: string;
  satwa?: string;
  satmya?: string;
  aharaSakti?: string;
}

export interface ClinicalHistoryData {
  sessionId: string;
  chiefComplaints: ChiefComplaintItem[];
  hpi?: HPIDetails;
  pastMedicalHistory: PastMedicalHistoryItem[];
  surgicalHistory: SurgicalHistoryItem[];
  medications: MedicationItem[];
  allergies: AllergyItem[];
  familyHistory: FamilyMedicalHistoryItem[];
  personalHistory?: PersonalSocialHistory;
  reviewOfSystems: ReviewOfSystemsItem[];
  ayushAssessment?: DashavidhaParikshaItem;
}

export type StructuredQuestionCategory = 
  | 'chief_complaint'
  | 'onset'
  | 'symptom_description'
  | 'severity'
  | 'prior_history'
  | 'medications'
  | 'additional_notes';

export interface StructuredQuestion {
  questionId: string;
  questionText: string;
  category: StructuredQuestionCategory;
  questionOrder: number;
  responseType: 'text' | 'voice';
  placeholderText?: string;
}

export type ClinicalHistorySessionStatus = 'in_progress' | 'completed';

export interface ClinicalHistorySession {
  sessionId: string;
  patientId: string;
  startedAt: string;
  updatedAt: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  status: ClinicalHistorySessionStatus;
  responses: HistoryResponse[];
}

export interface HistoryResponse {
  id: string;
  sessionId: string;
  questionId: string;
  questionText: string;
  category: string;
  answerRawText: string;
  inputMethod: 'text' | 'voice' | 'VOICE' | 'TOUCH' | 'EDIT';
  timestamp: string;
}

/**
 * Phase 3D Voice Input State Models (Step 1 & Step 2 Real STT)
 */
export type VoiceInputState = 'idle' | 'preparing' | 'listening' | 'stopped' | 'error' | 'unsupported';
