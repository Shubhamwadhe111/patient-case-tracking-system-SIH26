import React, { useState } from 'react';
import { 
  Stethoscope, 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  FileText, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Activity,
  Bell
} from 'lucide-react';

export interface DoctorDashboardProps {
  doctorInfo: {
    name: string;
    department: string;
    email: string;
  };
  onLogout: () => void;
  onSelectPatient: (patient: DemoPatient) => void;
}

export interface DemoPatient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  department: string;
  checkInTime: string;
  status: 'Waiting for Review' | 'In Progress' | 'Completed';
  chiefComplaint: string;
  priority: 'Normal' | 'Urgent';
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ doctorInfo, onLogout, onSelectPatient }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<DemoPatient | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 3 Realistic Demo Patient Records
  const demoPatients: DemoPatient[] = [
    {
      id: 'p1',
      patientId: 'MK-2026-8901',
      name: 'Rahul Sharma',
      age: 34,
      gender: 'Male',
      department: 'General Medicine',
      checkInTime: '09:15 AM (15 mins ago)',
      status: 'Waiting for Review',
      chiefComplaint: 'Severe headache behind right eye for 3 days, worse in the evening.',
      priority: 'Normal',
    },
    {
      id: 'p2',
      patientId: 'MK-2026-8902',
      name: 'Priya Patel',
      age: 28,
      gender: 'Female',
      department: 'General Medicine',
      checkInTime: '09:30 AM (5 mins ago)',
      status: 'In Progress',
      chiefComplaint: 'Chest tightness during morning walks and occasional breathlessness.',
      priority: 'Urgent',
    },
    {
      id: 'p3',
      patientId: 'MK-2026-8903',
      name: 'Amit Verma',
      age: 45,
      gender: 'Male',
      department: 'General Medicine',
      checkInTime: '08:45 AM (45 mins ago)',
      status: 'Completed',
      chiefComplaint: 'Routine blood pressure review & medication refill request.',
      priority: 'Normal',
    },
  ];

  const filteredPatients = demoPatients.filter((p) => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#111c2d',
    }}>
      
      {/* 1. TOP HEADER */}
      <header style={{
        height: '64px',
        backgroundColor: '#006565',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 10,
      }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Stethoscope size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
              CareConnect Physician Portal
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#e3fffe', opacity: 0.85 }}>
              OPD Queue & Intake Management
            </span>
          </div>
        </div>

        {/* Doctor Info & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#90c9ff',
              color: '#035584',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: '2px solid #ffffff',
            }}>
              AR
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{doctorInfo.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#e3fffe', opacity: 0.9 }}>{doctorInfo.department}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Sign Out"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>

      </header>

      {/* 2. BODY LAYOUT (SIDEBAR + MAIN CONTENT) */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* SIDEBAR */}
        <aside style={{
          width: '240px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          padding: '1.5rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            
            <div style={{ padding: '0 0.75rem 0.5rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              Main Menu
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === 'dashboard' ? '#f0f3ff' : 'transparent',
                color: activeTab === 'dashboard' ? '#006565' : '#475569',
                fontWeight: activeTab === 'dashboard' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <LayoutDashboard size={18} color={activeTab === 'dashboard' ? '#006565' : '#64748b'} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Patient Queue tab is a visual placeholder for Step 1.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#64748b',
                fontWeight: 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Users size={18} color="#64748b" />
              <span>Patient Queue</span>
              <span style={{ marginLeft: 'auto', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 700 }}>
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => alert('Patients tab is a visual placeholder for Step 1.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#64748b',
                fontWeight: 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <UserCheck size={18} color="#64748b" />
              <span>Patients</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Clinical History tab is a visual placeholder for Step 1.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#64748b',
                fontWeight: 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <FileText size={18} color="#64748b" />
              <span>Clinical History</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Documents tab is a visual placeholder for Step 1.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#64748b',
                fontWeight: 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <FolderOpen size={18} color="#64748b" />
              <span>Documents</span>
            </button>

            <button
              type="button"
              onClick={() => alert('Settings tab is a visual placeholder for Step 1.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.65rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#64748b',
                fontWeight: 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Settings size={18} color="#64748b" />
              <span>Settings</span>
            </button>

          </div>

          {/* Sidebar Footer Info */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            padding: '0.85rem',
            border: '1px solid #e2e8f0',
            fontSize: '0.75rem',
            color: '#64748b',
          }}>
            <div style={{ fontWeight: 700, color: '#1e293b' }}>Doctor Portal Step 1</div>
            <div style={{ marginTop: '2px', fontSize: '0.7rem' }}>Frontend Demo Shell Only</div>
          </div>

        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          
          {/* Title Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111c2d', margin: 0, letterSpacing: '-0.02em' }}>
                OPD Clinical Dashboard
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
                Overview of patient queue and clinical history intake for today
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px' }} />
                <input
                  type="text"
                  placeholder="Search patient name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    width: '240px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#475569',
              }}>
                <Filter size={14} color="#64748b" />
                <span>Filter Queue</span>
              </div>
            </div>
          </div>

          {/* METRICS OVERVIEW CARDS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem',
          }}>
            
            {/* Metric 1 */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>Patients Today</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111c2d', marginTop: '0.2rem' }}>12</div>
                <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>+4 new since 09:00 AM</span>
              </div>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#f0f3ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Users size={24} color="#206393" />
              </div>
            </div>

            {/* Metric 2 */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid #ffe58f',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#873800' }}>Waiting for Review</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d46b08', marginTop: '0.2rem' }}>4</div>
                <span style={{ fontSize: '0.7rem', color: '#d46b08', fontWeight: 600 }}>Requires Doctor Check</span>
              </div>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#fffbe6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Clock size={24} color="#d46b08" />
              </div>
            </div>

            {/* Metric 3 */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid #a7f3d0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#065f46' }}>Completed Intake</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>8</div>
                <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>Ready for Prescription</span>
              </div>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                backgroundColor: '#ecfdf5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <CheckCircle2 size={24} color="#059669" />
              </div>
            </div>

          </div>

          {/* PATIENT QUEUE LIST */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
            overflow: 'hidden',
          }}>
            
            {/* Table Header Row */}
            <div style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} color="#006565" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111c2d', margin: 0 }}>
                  Active Patient Queue ({filteredPatients.length})
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Sorted by Check-In Time
              </span>
            </div>

            {/* Patients List */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    transition: 'background-color 0.2s ease',
                    backgroundColor: selectedPatient?.id === patient.id ? '#f0f3ff' : '#ffffff',
                  }}
                >
                  
                  {/* Left Column: Patient ID & Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '260px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: patient.gender === 'Female' ? '#fce7f3' : '#e0f2fe',
                      color: patient.gender === 'Female' ? '#be185d' : '#0369a1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}>
                      <User size={22} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111c2d', margin: 0 }}>
                          {patient.name}
                        </h4>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                          {patient.patientId}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                        {patient.age} yrs • {patient.gender} • {patient.department}
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Chief Complaint Preview */}
                  <div style={{ flex: 1, minWidth: '240px', padding: '0 0.5rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Chief Complaint Preview
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '2px', fontWeight: 500 }}>
                      "{patient.chiefComplaint}"
                    </div>
                  </div>

                  {/* Right Column: Status & Action Button */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    
                    {/* Status Badge */}
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: patient.status === 'Waiting for Review' 
                        ? '#fffbe6' 
                        : patient.status === 'In Progress' 
                        ? '#e0f2fe' 
                        : '#ecfdf5',
                      color: patient.status === 'Waiting for Review' 
                        ? '#873800' 
                        : patient.status === 'In Progress' 
                        ? '#035584' 
                        : '#065f46',
                      border: patient.status === 'Waiting for Review' 
                        ? '1px solid #ffe58f' 
                        : patient.status === 'In Progress' 
                        ? '1px solid #90c9ff' 
                        : '1px solid #a7f3d0',
                    }}>
                      {patient.status === 'Waiting for Review' && <Clock size={12} />}
                      {patient.status === 'In Progress' && <Activity size={12} />}
                      {patient.status === 'Completed' && <CheckCircle2 size={12} />}
                      <span>{patient.status}</span>
                    </span>

                    {/* Action Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPatient(patient);
                        if (onSelectPatient) {
                          onSelectPatient(patient);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        backgroundColor: '#006565',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.5rem 0.85rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 101, 101, 0.2)',
                      }}
                    >
                      <span>Review History</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Selected Patient Banner Modal Preview */}
          {selectedPatient && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              backgroundColor: '#f0fdfa',
              borderRadius: '12px',
              border: '2px solid #008080',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Bell size={20} color="#006565" />
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#004f4f', margin: 0 }}>
                    Selected Demo Patient: {selectedPatient.name} ({selectedPatient.patientId})
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#006565', marginTop: '2px' }}>
                    Chief Complaint: "{selectedPatient.chiefComplaint}" • Step 1 Demo View
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #008080',
                  color: '#006565',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close Preview
              </button>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
