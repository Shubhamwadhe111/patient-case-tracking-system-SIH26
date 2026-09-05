/**
 * Doctor Profile & Department Domain Models
 */

export interface Department {
  id: string;
  code: string;
  name: string;
  description?: string;
  opdBlock?: string;
}

export interface DoctorProfile {
  id: string;
  userId: string;
  medicalRegistrationNumber: string;
  fullName: string;
  specialization: string;
  departmentId: string;
  departmentName: string;
  opdRoomNumber: string;
  isAvailable: boolean;
}
