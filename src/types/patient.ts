/**
 * Patient Demographics & Profile Domain Models
 */

export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'UNKNOWN';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface PatientDemographics {
  age: number;
  gender: Gender;
  dob?: string;
  bloodGroup?: BloodGroup;
  abhaId?: string;
  abhaAddress?: string;
  address?: {
    district?: string;
    state?: string;
    pincode?: string;
  };
  emergencyContact?: EmergencyContact;
}

export interface PatientProfile {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  demographics: PatientDemographics;
  preferredLanguage: string;
  registeredAt: string;
}
