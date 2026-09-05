/**
 * ABHA (Ayushman Bharat Health Account) Service Interface (Phase 1 Placeholder Contract)
 * To be fully implemented in Phase 2 / Phase 8.
 */

export interface ABHAVerificationResult {
  isVerified: boolean;
  abhaId?: string;
  name?: string;
  gender?: string;
  dob?: string;
  mobile?: string;
}

export interface IABHAService {
  isIntegrationReady(): boolean;
  verifyAbhaNumber(abhaNumber: string): Promise<ABHAVerificationResult>;
  requestOTP(abhaNumber: string): Promise<{ txnId: string }>;
  verifyOTP(txnId: string, otp: string): Promise<ABHAVerificationResult>;
}

export class Phase1ABHAService implements IABHAService {
  isIntegrationReady(): boolean {
    return false; // Phase 1 architectural contract only
  }

  async verifyAbhaNumber(_abhaNumber: string): Promise<ABHAVerificationResult> {
    throw new Error('ABHA / ABDM National Health ID integration is scheduled for Phase 8 implementation.');
  }

  async requestOTP(_abhaNumber: string): Promise<{ txnId: string }> {
    throw new Error('ABHA OTP gateway integration is scheduled for Phase 8 implementation.');
  }

  async verifyOTP(_txnId: string, _otp: string): Promise<ABHAVerificationResult> {
    throw new Error('ABHA OTP verification gateway is scheduled for Phase 8 implementation.');
  }
}

export const abhaService = new Phase1ABHAService();
