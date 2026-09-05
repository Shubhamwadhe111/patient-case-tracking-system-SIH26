import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  Settings, 
  LogOut, 
  Activity, 
  CheckCircle2, 
  Plus, 
  Download, 
  AlertTriangle, 
  Search, 
  UserPlus,
  ArrowLeft,
  Stethoscope,
  Save
} from 'lucide-react';
import { HospitalInfo } from './HospitalLogin';
import { DoctorManagement } from './DoctorManagement';
import { PatientManagement } from './PatientManagement';
import DoctorPortalApp from '../../../doctor-portal/src/App';
import { CareConnectLogo } from '../../../../src/components/common/CareConnectLogo';

export interface HospitalDashboardProps {
  hospitalInfo: HospitalInfo;
  onLogout: () => void;
}

export interface DoctorAvailability {
  id: string;
  name: string;
  department: string;
  status: 'Available' | 'In Consultation' | 'On Break';
  activePatients: number;
}

export interface RecentPatient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  department: string;
  checkInTime: string;
  status: 'Waiting for Review' | 'In Progress' | 'Completed';
}

export const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ hospitalInfo, onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Settings State
  const [hospitalName, setHospitalName] = useState<string>(hospitalInfo.name || 'CityCare Multispeciality Hospital');
  const [opdHours, setOpdHours] = useState<string>('08:00 AM - 08:00 PM (Mon-Sat)');
  const [contactPhone, setContactPhone] = useState<string>('+91 11 4050 9999');
  const [emergencyPhone, setEmergencyPhone] = useState<string>('102 / +91 11 4050 9112');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  // Doctor Availability Demo Data
  const doctors: DoctorAvailability[] = [
    {
      id: 'd1',
      name: 'Dr. Ananya Rao',
      department: 'General Medicine',
      status: 'Available',
      activePatients: 8,
    },
    {
      id: 'd2',
      name: 'Dr. Rahul Mehta',
      department: 'Cardiology',
      status: 'In Consultation',
      activePatients: 12,
    },
    {
      id: 'd3',
      name: 'Dr. Priya Sharma',
      department: 'Pediatrics',
      status: 'Available',
      activePatients: 6,
    },
  ];

  // Recent Patients Demo Data
  const recentPatients: RecentPatient[] = [
    {
      id: 'p1',
      patientId: 'MK-2026-8901',
      name: 'Rahul Sharma',
      age: 34,
      gender: 'Male',
      department: 'General Medicine',
      checkInTime: '09:15 AM',
      status: 'Waiting for Review',
    },
    {
      id: 'p2',
      patientId: 'MK-2026-8902',
      name: 'Priya Patel',
      age: 28,
      gender: 'Female',
      department: 'General Medicine',
      checkInTime: '09:30 AM',
      status: 'In Progress',
    },
    {
      id: 'p3',
      patientId: 'MK-2026-8903',
      name: 'Amit Verma',
      age: 45,
      gender: 'Male',
      department: 'Cardiology',
      checkInTime: '08:45 AM',
      status: 'Completed',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#1e293b',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* 1. TOP HEADER BAR */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <CareConnectLogo onClick={handleGoHome} subtitleColor="#006565" />
          <div style={{ borderLeft: '1.5px solid #cbd5e1', height: '24px' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#111c2d' }}>
                Hospital Web Portal
              </h1>
              <span style={{
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                border: '1px solid #a7f3d0',
              }}>
                OPD Status: Active
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
              Hospital Administration &amp; Clinical Operations • {hospitalName}
            </p>
          </div>
        </div>

        {/* WEBSITE NAV & LOGOUT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleGoHome}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#ffffff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={15} />
            <span>Website</span>
          </button>

          <div style={{ textAlign: 'right', paddingLeft: '0.5rem', borderLeft: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Hospital Admin</div>
            <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{hospitalInfo.email}</div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#ffffff',
              color: '#dc2626',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER WITH SIDEBAR */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* 2. LEFT SIDEBAR NAVIGATION */}
        <aside style={{
          width: '250px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          padding: '1.25rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', padding: '0.5rem 0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Hospital Modules
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === 'dashboard' ? '#f0fdfa' : 'transparent',
                color: activeTab === 'dashboard' ? '#006565' : '#475569',
                fontWeight: activeTab === 'dashboard' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <LayoutDashboard size={18} color={activeTab === 'dashboard' ? '#006565' : '#64748b'} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('doctors')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === 'doctors' ? '#f0fdfa' : 'transparent',
                color: activeTab === 'doctors' ? '#006565' : '#475569',
                fontWeight: activeTab === 'doctors' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <UserCheck size={18} color={activeTab === 'doctors' ? '#006565' : '#64748b'} />
              <span>Doctors</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('patients')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === 'patients' ? '#f0fdfa' : 'transparent',
                color: activeTab === 'patients' ? '#006565' : '#475569',
                fontWeight: activeTab === 'patients' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Users size={18} color={activeTab === 'patients' ? '#006565' : '#64748b'} />
              <span>Patients</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('consultations')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === 'consultations' ? '#f0fdfa' : 'transparent',
                color: activeTab === 'consultations' ? '#006565' : '#475569',
                fontWeight: activeTab === 'consultations' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Stethoscope size={18} color={activeTab === 'consultations' ? '#006565' : '#64748b'} />
              <span>Doctor Consultation</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === 'settings' ? '#f0fdfa' : 'transparent',
                color: activeTab === 'settings' ? '#006565' : '#475569',
                fontWeight: activeTab === 'settings' ? 700 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Settings size={18} color={activeTab === 'settings' ? '#006565' : '#64748b'} />
              <span>Settings / Profile</span>
            </button>
          </div>

          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            padding: '0.75rem',
            fontSize: '0.75rem',
            color: '#64748b',
          }}>
            <div style={{ fontWeight: 700, color: '#334155', marginBottom: '2px' }}>CareConnect Hospital Node</div>
            <div>Facility: {hospitalName}</div>
            <div style={{ marginTop: '4px', fontSize: '0.7rem', color: '#006565', fontWeight: 600 }}>Operational Status: Online</div>
          </div>
        </aside>

        {/* 3. MAIN DASHBOARD CONTENT */}
        <main style={{ flex: 1, padding: '1.5rem', boxSizing: 'border-box', overflowY: 'auto' }}>
          
          {activeTab === 'doctors' ? (
            <DoctorManagement onBackToDashboard={() => setActiveTab('dashboard')} />
          ) : activeTab === 'patients' ? (
            <PatientManagement onBackToDashboard={() => setActiveTab('dashboard')} />
          ) : activeTab === 'consultations' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
              }}>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Doctor Consultation &amp; Clinical Operations Workspace
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
                    Integrated clinical consultation workspace for OPD doctors &amp; clinicians
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#475569',
                    cursor: 'pointer',
                  }}
                >
                  ← Back to Dashboard
                </button>
              </div>

              <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                <DoctorPortalApp />
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            <div style={{ maxWidth: '800px' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Hospital Administration &amp; Profile Settings
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, marginTop: '4px' }}>
                  Manage hospital facility profile, OPD working hours, and operational contact details.
                </p>
              </div>

              {isSaved && (
                <div style={{
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#065f46',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <CheckCircle2 size={18} />
                  <span>Hospital settings saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    Hospital / Healthcare Facility Name
                  </label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      OPD Administrative Department
                    </label>
                    <input
                      type="text"
                      value={hospitalInfo.department}
                      disabled
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        fontSize: '0.9rem',
                        color: '#64748b',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Facility Code / License No.
                    </label>
                    <input
                      type="text"
                      value={hospitalInfo.code}
                      disabled
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc',
                        fontSize: '0.9rem',
                        color: '#64748b',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    OPD Timings &amp; Operating Hours
                  </label>
                  <input
                    type="text"
                    value={opdHours}
                    onChange={(e) => setOpdHours(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      OPD Reception Helpline
                    </label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Emergency Hotline
                    </label>
                    <input
                      type="text"
                      value={emergencyPhone}
                      onChange={(e) => setEmergencyPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.9rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#006565',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.65rem 1.25rem',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <Save size={16} />
                    <span>Save Hospital Profile</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* HEADER TITLE */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
                {activeTab === 'dashboard' && 'Hospital Administration Overview'}
                {activeTab === 'doctors' && 'Doctor Roster & Availability'}
                {activeTab === 'patients' && 'Today\'s Patient Queue & Activity'}
                {activeTab === 'consultations' && 'Consultation Records & Logs'}
                {activeTab === 'settings' && 'Hospital OPD Portal Settings'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
                Real-time operational snapshot for CityCare Multispeciality Hospital
              </p>
            </div>

            {/* SEARCH BAR */}
            <div style={{ position: 'relative', width: '260px' }}>
              <input
                type="text"
                placeholder="Search patient, doctor, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <Search size={15} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* DASHBOARD METRIC CARDS (ROW 1) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            
            {/* Metric 1: Total Doctors */}
            <div 
              onClick={() => setActiveTab('doctors')}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Total Doctors</span>
                <div style={{ padding: '0.4rem', backgroundColor: '#e0f2fe', borderRadius: '6px', color: '#0284c7' }}>
                  <UserCheck size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111c2d' }}>24</div>
              <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem', fontWeight: 600 }}>
                Across 6 OPD Departments
              </div>
            </div>

            {/* Metric 2: Active Doctors */}
            <div 
              onClick={() => setActiveTab('doctors')}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Active Doctors</span>
                <div style={{ padding: '0.4rem', backgroundColor: '#ecfdf5', borderRadius: '6px', color: '#059669' }}>
                  <Activity size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>18</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                75% On Duty & Active
              </div>
            </div>

            {/* Metric 3: Patients Today */}
            <div 
              onClick={() => setActiveTab('patients')}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Patients Today</span>
                <div style={{ padding: '0.4rem', backgroundColor: '#e0fdf4', borderRadius: '6px', color: '#006565' }}>
                  <Users size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#006565' }}>86</div>
              <div style={{ fontSize: '0.75rem', color: '#006565', marginTop: '0.25rem', fontWeight: 600 }}>
                +14% vs yesterday
              </div>
            </div>

            {/* Metric 4: Completed Consultations */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.1rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Completed Consultations</span>
                <div style={{ padding: '0.4rem', backgroundColor: '#fef3c7', borderRadius: '6px', color: '#d97706' }}>
                  <CheckCircle2 size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706' }}>61</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                71% Completion Rate Today
              </div>
            </div>

          </div>

          {/* MAIN 4 SECTIONS GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            
            {/* SECTION 1: TODAY'S PATIENT ACTIVITY BREAKDOWN */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
                    Today's Patient Activity
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
                    Hourly OPD patient check-ins & completed consultations
                  </p>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#006565', backgroundColor: '#f0fdfa', padding: '3px 8px', borderRadius: '12px' }}>
                  Live OPD Stream
                </span>
              </div>

              {/* SIMULATED BREAKDOWN BAR CHART */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    <span>General Medicine OPD</span>
                    <span>38 Patients (44%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '44%', height: '100%', backgroundColor: '#006565', borderRadius: '4px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    <span>Cardiology OPD</span>
                    <span>24 Patients (28%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '28%', height: '100%', backgroundColor: '#0284c7', borderRadius: '4px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    <span>Pediatrics OPD</span>
                    <span>16 Patients (18%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '18%', height: '100%', backgroundColor: '#10b981', borderRadius: '4px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    <span>Orthopedics OPD</span>
                    <span>8 Patients (10%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '10%', height: '100%', backgroundColor: '#f59e0b', borderRadius: '4px' }} />
                  </div>
                </div>

              </div>

              <div style={{
                marginTop: '1.25rem',
                paddingTop: '0.85rem',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#64748b',
              }}>
                <span>Peak Volume: 09:00 AM – 11:00 AM</span>
                <span>Average Consultation: 12 mins</span>
              </div>
            </div>

            {/* SECTION 2: DOCTOR AVAILABILITY */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
                  Doctor Availability
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('doctors')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.75rem',
                    color: '#0284c7',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Manage Doctors →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{doc.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{doc.department}</div>
                    </div>

                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '12px',
                      backgroundColor: doc.status === 'Available' ? '#ecfdf5' : '#e0f2fe',
                      color: doc.status === 'Available' ? '#065f46' : '#0369a1',
                      border: doc.status === 'Available' ? '1px solid #a7f3d0' : '1px solid #bae6fd',
                    }}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SECOND ROW: RECENT PATIENTS & QUICK ACTIONS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
            gap: '1.5rem',
          }}>
            
            {/* SECTION 3: RECENT PATIENTS */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
                  Recent Registered Patients
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('patients')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.75rem',
                    color: '#0284c7',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Manage Patients →
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '0.5rem', fontWeight: 700 }}>Patient</th>
                      <th style={{ padding: '0.5rem', fontWeight: 700 }}>Patient ID</th>
                      <th style={{ padding: '0.5rem', fontWeight: 700 }}>Department</th>
                      <th style={{ padding: '0.5rem', fontWeight: 700 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPatients.map((pt) => (
                      <tr key={pt.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.65rem 0.5rem', fontWeight: 700, color: '#0f172a' }}>{pt.name}</td>
                        <td style={{ padding: '0.65rem 0.5rem', color: '#006565', fontWeight: 700 }}>{pt.patientId}</td>
                        <td style={{ padding: '0.65rem 0.5rem', color: '#475569' }}>{pt.department}</td>
                        <td style={{ padding: '0.65rem 0.5rem' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            backgroundColor: pt.status === 'Completed' ? '#ecfdf5' : pt.status === 'In Progress' ? '#e0f2fe' : '#fffbe5',
                            color: pt.status === 'Completed' ? '#065f46' : pt.status === 'In Progress' ? '#0369a1' : '#b45309',
                          }}>
                            {pt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 4: QUICK ACTIONS */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111c2d', margin: 0, marginBottom: '1rem' }}>
                Quick Operations
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                
                <button
                  type="button"
                  onClick={() => alert('Demo Action: Add Doctor modal placeholder')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#006565',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  <UserPlus size={20} color="#006565" />
                  <span>Add Doctor</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Demo Action: Register Patient modal placeholder')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0284c7',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={20} color="#0284c7" />
                  <span>Register Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Demo Action: Exporting OPD Daily Report CSV/PDF...')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  <Download size={20} color="#475569" />
                  <span>Export Report</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Emergency Alert Broadcast Sent to OPD Administration!')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(220, 38, 38, 0.1)',
                  }}
                >
                  <AlertTriangle size={20} color="#dc2626" />
                  <span>Emergency Alert</span>
                </button>

              </div>
            </div>

          </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;
