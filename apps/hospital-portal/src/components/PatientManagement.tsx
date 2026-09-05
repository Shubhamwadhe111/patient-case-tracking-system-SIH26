import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  Eye, 
  ArrowLeft, 
  X, 
  UserCheck, 
  FileText, 
  Clock, 
  Building2, 
  ShieldCheck, 
  UserPlus
} from 'lucide-react';

export interface PatientRecord {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  department: string;
  assignedDoctor: string;
  historyStatus: 'History Completed' | 'In Progress' | 'Pending';
  consultationStatus: 'Waiting' | 'In Progress' | 'Consultation Completed';
  abhaId: string;
  symptoms: string;
  checkInTime: string;
  queuePosition?: number;
}

export interface PatientManagementProps {
  onBackToDashboard?: () => void;
}

export const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: 'pt-1',
    patientId: 'MK-2026-8901',
    name: 'Rahul Sharma',
    age: 34,
    gender: 'Male',
    department: 'General Medicine',
    assignedDoctor: 'Dr. Ananya Rao',
    historyStatus: 'History Completed',
    consultationStatus: 'Waiting',
    abhaId: '91-8821-4401-19',
    symptoms: 'Fever, Dry Cough, Mild Chest Tightness (3 days duration)',
    checkInTime: '09:15 AM',
    queuePosition: 2,
  },
  {
    id: 'pt-2',
    patientId: 'MK-2026-8902',
    name: 'Priya Patel',
    age: 28,
    gender: 'Female',
    department: 'Pediatrics',
    assignedDoctor: 'Dr. Priya Sharma',
    historyStatus: 'In Progress',
    consultationStatus: 'In Progress',
    abhaId: '91-4410-9920-43',
    symptoms: 'High Fever, Appetite Loss, Mild Skin Rash (2 days duration)',
    checkInTime: '09:30 AM',
    queuePosition: 1,
  },
  {
    id: 'pt-3',
    patientId: 'MK-2026-8903',
    name: 'Amit Verma',
    age: 45,
    gender: 'Male',
    department: 'Cardiology',
    assignedDoctor: 'Dr. Rahul Mehta',
    historyStatus: 'History Completed',
    consultationStatus: 'Consultation Completed',
    abhaId: '91-7712-3390-88',
    symptoms: 'Palpitations, Shortness of Breath on exertion (5 days duration)',
    checkInTime: '08:45 AM',
  },
  {
    id: 'pt-4',
    patientId: 'MK-2026-8904',
    name: 'Sneha Joshi',
    age: 31,
    gender: 'Female',
    department: 'General Medicine',
    assignedDoctor: 'Dr. Ananya Rao',
    historyStatus: 'Pending',
    consultationStatus: 'Waiting',
    abhaId: '91-3329-8810-52',
    symptoms: 'Persistent Fatigue, Recurrent Frontal Headache (1 week duration)',
    checkInTime: '10:05 AM',
    queuePosition: 4,
  },
];

export const PatientManagement: React.FC<PatientManagementProps> = ({ onBackToDashboard }) => {
  const [patientsList] = useState<PatientRecord[]>(INITIAL_PATIENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('All');
  const [selectedHistoryStatus, setSelectedHistoryStatus] = useState<string>('All');
  const [selectedConsultStatus, setSelectedConsultStatus] = useState<string>('All');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  // Filter Dropdown Options
  const departments = ['All', 'General Medicine', 'Pediatrics', 'Cardiology', 'Orthopedics'];
  const doctors = ['All', 'Dr. Ananya Rao', 'Dr. Priya Sharma', 'Dr. Rahul Mehta', 'Dr. Vikram Shah'];
  const historyStatuses = ['All', 'History Completed', 'In Progress', 'Pending'];
  const consultStatuses = ['All', 'Waiting', 'In Progress', 'Consultation Completed'];

  // Filtered Patients List
  const filteredPatients = patientsList.filter((pt) => {
    const matchesSearch = 
      pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.assignedDoctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.abhaId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'All' || pt.department === selectedDepartment;
    const matchesDoc = selectedDoctor === 'All' || pt.assignedDoctor === selectedDoctor;
    const matchesHistory = selectedHistoryStatus === 'All' || pt.historyStatus === selectedHistoryStatus;
    const matchesConsult = selectedConsultStatus === 'All' || pt.consultationStatus === selectedConsultStatus;

    return matchesSearch && matchesDept && matchesDoc && matchesHistory && matchesConsult;
  });

  // History Badge Renderer
  const renderHistoryBadge = (status: PatientRecord['historyStatus']) => {
    let bg = '#f1f5f9';
    let color = '#475569';
    let border = '#cbd5e1';

    if (status === 'History Completed') {
      bg = '#ecfdf5';
      color = '#065f46';
      border = '#a7f3d0';
    } else if (status === 'In Progress') {
      bg = '#e0f2fe';
      color = '#0369a1';
      border = '#bae6fd';
    } else if (status === 'Pending') {
      bg = '#f1f5f9';
      color = '#64748b';
      border = '#cbd5e1';
    }

    return (
      <span style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: '12px',
        backgroundColor: bg,
        color: color,
        border: `1px solid ${border}`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {status}
      </span>
    );
  };

  // Consultation Badge Renderer
  const renderConsultationBadge = (status: PatientRecord['consultationStatus']) => {
    let bg = '#fffbe5';
    let color = '#b45309';
    let border = '#fde68a';

    if (status === 'Consultation Completed') {
      bg = '#ecfdf5';
      color = '#065f46';
      border = '#a7f3d0';
    } else if (status === 'In Progress') {
      bg = '#e0f2fe';
      color = '#0369a1';
      border = '#bae6fd';
    } else if (status === 'Waiting') {
      bg = '#fffbe5';
      color = '#b45309';
      border = '#fde68a';
    }

    return (
      <span style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: '12px',
        backgroundColor: bg,
        color: color,
        border: `1px solid ${border}`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {status}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* TOP ACTION BAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {onBackToDashboard && (
            <button
              type="button"
              onClick={onBackToDashboard}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0.5rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#334155',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </button>
          )}
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111c2d', margin: 0 }}>
              Patient Management
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
              CareConnect Patient Directory, Intake Progress & Consultation Queue
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert('Demo Action: Register New Patient modal placeholder')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#006565',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 1.1rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,101,101,0.2)',
          }}
        >
          <UserPlus size={18} />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #cbd5e1',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}>
        {/* Search Field */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Search by patient name, Patient ID, assigned doctor, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem 0.65rem 2.4rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Multi Dropdown Filters Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Department Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Department:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1e293b',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Assigned Doctor Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Doctor:</span>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1e293b',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {doctors.map((doc) => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
          </div>

          {/* History Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>History Status:</span>
            <select
              value={selectedHistoryStatus}
              onChange={(e) => setSelectedHistoryStatus(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1e293b',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {historyStatuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Consultation Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Consult Status:</span>
            <select
              value={selectedConsultStatus}
              onChange={(e) => setSelectedConsultStatus(e.target.value)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1e293b',
                backgroundColor: '#ffffff',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {consultStatuses.map((cs) => (
                <option key={cs} value={cs}>{cs}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {(searchQuery || selectedDepartment !== 'All' || selectedDoctor !== 'All' || selectedHistoryStatus !== 'All' || selectedConsultStatus !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDepartment('All');
                setSelectedDoctor('All');
                setSelectedHistoryStatus('All');
                setSelectedConsultStatus('All');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#006565',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reset Filters
            </button>
          )}

        </div>
      </div>

      {/* PATIENT TABLE / GRID */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #cbd5e1',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}>
        {filteredPatients.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            <Users size={36} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', margin: 0 }}>No Patients Found</h3>
            <p style={{ fontSize: '0.85rem', margin: '4px 0 0 0' }}>Try adjusting your search query or filter selection.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{
                  backgroundColor: '#f8fafc',
                  borderBottom: '1.5px solid #e2e8f0',
                  textAlign: 'left',
                  color: '#475569',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Patient Name</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Patient ID</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Age / Gender</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Department</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Assigned Doctor</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Clinical History</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Consult Status</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((pt) => (
                  <tr key={pt.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    
                    {/* Name */}
                    <td style={{ padding: '1rem', fontWeight: 800, color: '#0f172a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#e0f2fe',
                          color: '#0284c7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                        }}>
                          {pt.name.charAt(0)}
                        </div>
                        <span>{pt.name}</span>
                      </div>
                    </td>

                    {/* Patient ID */}
                    <td style={{ padding: '1rem', color: '#006565', fontWeight: 800 }}>
                      {pt.patientId}
                    </td>

                    {/* Age / Gender */}
                    <td style={{ padding: '1rem', color: '#334155', fontWeight: 600 }}>
                      {pt.age} / {pt.gender}
                    </td>

                    {/* Department */}
                    <td style={{ padding: '1rem', color: '#334155' }}>
                      {pt.department}
                    </td>

                    {/* Assigned Doctor */}
                    <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 700 }}>
                      {pt.assignedDoctor}
                    </td>

                    {/* Clinical History */}
                    <td style={{ padding: '1rem' }}>
                      {renderHistoryBadge(pt.historyStatus)}
                    </td>

                    {/* Consult Status */}
                    <td style={{ padding: '1rem' }}>
                      {renderConsultationBadge(pt.consultationStatus)}
                    </td>

                    {/* Action */}
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedPatient(pt)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          backgroundColor: '#ffffff',
                          color: '#006565',
                          border: '1px solid #006565',
                          borderRadius: '6px',
                          padding: '0.4rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        <Eye size={14} />
                        <span>View Patient</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PATIENT DETAILS MODAL / PANEL */}
      {selectedPatient && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#006565',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                }}>
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {selectedPatient.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                    ID: <strong>{selectedPatient.patientId}</strong> • {selectedPatient.age} Yrs / {selectedPatient.gender}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              
              {/* Status Header Pills */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f8fafc',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Clinical History</span>
                  {renderHistoryBadge(selectedPatient.historyStatus)}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>Consultation Status</span>
                  {renderConsultationBadge(selectedPatient.consultationStatus)}
                </div>
              </div>

              {/* Details List */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block' }}>ABHA HEALTH ID</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    <ShieldCheck size={16} color="#006565" />
                    <span>{selectedPatient.abhaId}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block' }}>OPD DEPARTMENT</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    <Building2 size={16} color="#0284c7" />
                    <span>{selectedPatient.department}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block' }}>ASSIGNED PHYSICIAN</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    <UserCheck size={16} color="#006565" />
                    <span>{selectedPatient.assignedDoctor}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block' }}>CHECK-IN TIME</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                    <Clock size={16} color="#d97706" />
                    <span>{selectedPatient.checkInTime}</span>
                  </div>
                </div>

              </div>

              {/* Symptoms Logged */}
              <div style={{
                backgroundColor: '#f0fdfa',
                border: '1px solid #a7f3d0',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#065f46', marginBottom: '4px' }}>
                  CHIEF COMPLAINTS & LOGGED SYMPTOMS
                </div>
                <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600, lineHeight: 1.4 }}>
                  "{selectedPatient.symptoms}"
                </div>
              </div>

              {/* Intake Progress & Queue Box */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                fontSize: '0.8rem',
                color: '#334155',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>Clinical History Progress</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                    {selectedPatient.historyStatus === 'History Completed' ? '7 of 7 Intake Questions Answered' : 'Intake In Progress'}
                  </div>
                </div>

                {selectedPatient.queuePosition && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>OPD Queue Position</div>
                    <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700, marginTop: '2px' }}>
                      Position #{selectedPatient.queuePosition} in Queue
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end',
            }}>
              <button
                type="button"
                onClick={() => alert(`Demo Action: Opening full intake summary for ${selectedPatient.name}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid #006565',
                  backgroundColor: '#ffffff',
                  color: '#006565',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <FileText size={15} />
                <span>View Intake Summary</span>
              </button>

              <button
                type="button"
                onClick={() => alert(`Demo Action: Reassign physician modal for ${selectedPatient.name}`)}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Reassign Doctor
              </button>

              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#006565',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PatientManagement;
