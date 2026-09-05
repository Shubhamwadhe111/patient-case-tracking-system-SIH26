import React from 'react';
import { APP_CONFIG } from '../../config/appConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div>
          <strong>{APP_CONFIG.name}</strong> — AI-Powered Healthcare Platform
        </div>
        <div>
          Patient Intake & Clinical Workflow Systems
        </div>
      </div>
    </footer>
  );
};
