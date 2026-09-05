import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApplicationShell } from './components/shell/ApplicationShell';
import { LandingPage } from './pages/LandingPage';
import { PatientShellPage } from './pages/PatientShellPage';
import { DoctorShellPage } from './pages/DoctorShellPage';
import { HospitalShellPage } from './pages/HospitalShellPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ApplicationShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/patient" element={<PatientShellPage />} />
          <Route path="/doctor" element={<DoctorShellPage />} />
          <Route path="/hospital" element={<HospitalShellPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ApplicationShell>
    </BrowserRouter>
  );
};

export default App;
