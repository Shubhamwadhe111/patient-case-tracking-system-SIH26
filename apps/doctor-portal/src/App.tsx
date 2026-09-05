import React, { useState } from 'react';
import { DoctorLogin } from './components/DoctorLogin';
import { DoctorDashboard, DemoPatient } from './components/DoctorDashboard';
import { PatientClinicalHistory } from './components/PatientClinicalHistory';
import { DoctorConsultation } from './components/DoctorConsultation';

export interface DoctorInfo {
  name: string;
  department: string;
  email: string;
}

export type PortalViewMode = 'queue' | 'history' | 'consultation';

export const DoctorPortalApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<PortalViewMode>('queue');
  const [selectedPatient, setSelectedPatient] = useState<DemoPatient | null>(null);
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>({
    name: 'Dr. Ananya Rao',
    department: 'General Medicine OPD',
    email: 'dr.ananya@careconnect.in',
  });

  const handleLoginSuccess = (info: DoctorInfo) => {
    setDoctorInfo(info);
    setIsAuthenticated(true);
    setViewMode('queue');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedPatient(null);
    setViewMode('queue');
  };

  if (!isAuthenticated) {
    return <DoctorLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (viewMode === 'consultation' && selectedPatient) {
    return (
      <DoctorConsultation
        patient={selectedPatient}
        doctorInfo={doctorInfo}
        onBackToHistory={() => setViewMode('history')}
        onReturnToQueue={() => {
          setSelectedPatient(null);
          setViewMode('queue');
        }}
      />
    );
  }

  if (viewMode === 'history' && selectedPatient) {
    return (
      <PatientClinicalHistory
        patient={selectedPatient}
        onBack={() => {
          setSelectedPatient(null);
          setViewMode('queue');
        }}
        onStartConsultation={() => setViewMode('consultation')}
      />
    );
  }

  return (
    <DoctorDashboard
      doctorInfo={doctorInfo}
      onLogout={handleLogout}
      onSelectPatient={(patient) => {
        setSelectedPatient(patient);
        setViewMode('history');
      }}
    />
  );
};

export default DoctorPortalApp;
