/**
 * CareConnect Patient Kiosk Entry Point (React Native + Expo Foundation)
 * Option B Monorepo Target Architecture
 */

import React from 'react';
import type { OnboardingStep } from '@medikiosk/shared-types';
import { APP_CONFIG } from '@medikiosk/shared-config';

export const PatientKioskApp: React.FC = () => {
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ color: '#0f766e', fontSize: '2rem', fontWeight: 800 }}>
          CareConnect — Patient Kiosk Module
        </h1>
        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
          Target Architecture: React Native + Expo Tablet Kiosk Shell
        </p>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f0fdfa',
          borderRadius: '10px',
          border: '1px solid #14b8a6',
          color: '#134e4a',
        }}>
          <strong>Active Status:</strong> Phase 2 Patient Onboarding Completed
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
            <li>Multilingual Welcome & Language Selection (8 Indian Languages)</li>
            <li>ABHA ID Mock Verification & New Patient Registration</li>
            <li>DPDP-compliant Privacy Consent Terms</li>
            <li>OPD Clinic Department Selection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientKioskApp;
