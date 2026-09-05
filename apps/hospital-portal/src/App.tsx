import React, { useState } from 'react';
import { HospitalLogin, HospitalInfo } from './components/HospitalLogin';
import { HospitalDashboard } from './components/HospitalDashboard';

export const HospitalPortalApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo>({
    name: 'CityCare Multispeciality Hospital',
    code: 'HOSP-CITY-2026',
    email: 'admin@citycare.in',
    department: 'Central OPD Administration',
  });

  const handleLoginSuccess = (info: HospitalInfo) => {
    setHospitalInfo(info);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <HospitalLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <HospitalDashboard
      hospitalInfo={hospitalInfo}
      onLogout={handleLogout}
    />
  );
};

export default HospitalPortalApp;
