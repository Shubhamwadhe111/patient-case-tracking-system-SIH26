import React from 'react';

export interface ApplicationShellProps {
  children: React.ReactNode;
}

/**
 * ApplicationShell
 * Allows each route (Landing Page, Patient App, Hospital Web Portal, Doctor Workspace) 
 * to render its own dedicated header, navigation, and full-bleed layout without double-header wrappers.
 */
export const ApplicationShell: React.FC<ApplicationShellProps> = ({ children }) => {
  return <>{children}</>;
};

export default ApplicationShell;
