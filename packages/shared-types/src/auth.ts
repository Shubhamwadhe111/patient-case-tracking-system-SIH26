/**
 * User & Role Domain Models
 */

export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  phone?: string;
  email?: string;
  preferredLanguage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  user: User;
  token?: string;
  authenticatedAt: string;
}
