import React, { useState } from 'react';
import { 
  Search, 
  UserCheck, 
  Eye, 
  ArrowLeft, 
  X, 
  Clock, 
  MapPin, 
  Award, 
  Users, 
  Plus,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';

export interface DoctorRecord {
  id: string;
  doctorId: string;
  name: string;
  department: string;
  specialization: string;
  status: 'Available' | 'In Consultation' | 'Offline';
  patientsToday: number;
  consultationStatus: string;
  regNumber: string;
  opdRoom: string;
  shiftHours: string;
  email: string;
  phone: string;
}

export interface DoctorManagementProps {
  onBackToDashboard?: () => void;
}

export const INITIAL_DOCTORS: DoctorRecord[] = [
  {
    id: 'doc-1',
    doctorId: 'DOC-2026-01',
    name: 'Dr. Ananya Rao',
    department: 'General Medicine',
    specialization: 'Internal Medicine & Chronic Care',
    status: 'Available',
    patientsToday: 12,
    consultationStatus: '3 Waiting in Queue',
    regNumber: 'MMC-2021-98765',
    opdRoom: 'Room 104, Block B',
    shiftHours: '09:00 AM - 05:00 PM',
    email: 'dr.ananya@careconnect.in',
    phone: '+91 98765 43210',
  },
  {
    id: 'doc-2',
    doctorId: 'DOC-2026-02',
    name: 'Dr. Rahul Mehta',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    status: 'In Consultation',
    patientsToday: 8,
    consultationStatus: 'Active Consultation',
    regNumber: 'MMC-2018-44219',
    opdRoom: 'Room 202, Block A',
    shiftHours: '08:30 AM - 04:30 PM',
    email: 'dr.rahul@careconnect.in',
    phone: '+91 98765 12345',
  },
  {
    id: 'doc-3',
    doctorId: 'DOC-2026-03',
    name: 'Dr. Priya Sharma',
    department: 'Pediatrics',
    specialization: 'Pediatric Care & Neonatology',
    status: 'Available',
    patientsToday: 10,
    consultationStatus: '1 Waiting in Queue',
    regNumber: 'MMC-2022-77104',
    opdRoom: 'Room 108, Block C',
    shiftHours: '10:00 AM - 06:00 PM',
    email: 'dr.priya@careconnect.in',
    phone: '+91 98123 45678',
  },
  {
    id: 'doc-4',
    doctorId: 'DOC-2026-04',
    name: 'Dr. Vikram Shah',
    department: 'Orthopedics',
    specialization: 'Joint Replacement & Trauma',
    status: 'Offline',
    patientsToday: 6,
    consultationStatus: 'Shift Completed',
    regNumber: 'MMC-2015-11982',
    opdRoom: 'Room 305, Block B',
    shiftHours: '08:00 AM - 02:00 PM',
    email: 'dr.vikram@careconnect.in',
    phone: '+91 97654 32109',
  },
];

export const DoctorManagement: React.FC<DoctorManagementProps> = ({ onBackToDashboard }) => {
  const [doctorsList] = useState<DoctorRecord[]>(INITIAL_DOCTORS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorRecord | null>(null);

  // Department List
  const departments = ['All', 'General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics'];
  const availabilityStatuses = ['All', 'Available', 'In Consultation', 'Offline'];

  // Filtered Doctors
  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.doctorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'All' || doc.department === selectedDepartment;
    const matchesStatus = selectedAvailability === 'All' || doc.status === selectedAvailability;

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Badge Color Mapper
  const renderStatusBadge = (status: DoctorRecord['status']) => {
    let bg = '#f1f5f9';
    let color = '#475569';
    let border = '#cbd5e1';

    if (status === 'Available') {
      bg = '#ecfdf5';
      color = '#065f46';
      border = '#a7f3d0';
    } else if (status === 'In Consultation') {
      bg = '#fffbe5';
      color = '#b45309';
      border = '#fde68a';
    } else if (status === 'Offline') {
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
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: color,
        }} />
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
              Doctor Management
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, marginTop: '2px' }}>
              CareConnect Physician Roster, OPD Assignments & Live Availability
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert('Demo Action: Add New Doctor modal placeholder')}
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
          <Plus size={18} />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #cbd5e1',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '1rem',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      }}>
        {/* Search Field */}
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <input
            type="text"
            placeholder="Search by doctor name, ID, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.85rem 0.6rem 2.3rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.85rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Dropdown Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Department Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Department:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{
                padding: '0.55rem 0.85rem',
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

          {/* Availability Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Availability:</span>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              style={{
                padding: '0.55rem 0.85rem',
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
              {availabilityStatuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {(searchQuery || selectedDepartment !== 'All' || selectedAvailability !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDepartment('All');
                setSelectedAvailability('All');
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

      {/* DOCTORS GRID / TABLE */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.25rem',
      }}>
        {filteredDoctors.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            padding: '3rem',
            textAlign: 'center',
            color: '#64748b',
          }}>
            <UserCheck size={36} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', margin: 0 }}>No Doctors Found</h3>
            <p style={{ fontSize: '0.85rem', margin: '4px 0 0 0' }}>Try adjusting your search terms or filter options.</p>
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              <div>
                {/* Card Header: Avatar, Name, Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#e0f2fe',
                      color: '#0284c7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1rem',
                    }}>
                      {doc.name.replace('Dr. ', '').charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {doc.name}
                      </h3>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#006565' }}>
                        {doc.doctorId}
                      </div>
                    </div>
                  </div>

                  {renderStatusBadge(doc.status)}
                </div>

                {/* Info Fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: '#475569' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: '#64748b' }}>Department:</span>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{doc.department}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: '#64748b' }}>Specialization:</span>
                    <span style={{ fontWeight: 500, color: '#334155' }}>{doc.specialization}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: '#64748b' }}>OPD Location:</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{doc.opdRoom}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: '#64748b' }}>Shift Hours:</span>
                    <span style={{ fontWeight: 600, color: '#006565' }}>{doc.shiftHours}</span>
                  </div>
                </div>

                {/* Workload Stats */}
                <div style={{
                  marginTop: '0.85rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block' }}>Patients Today</span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{doc.patientsToday}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#64748b', display: 'block' }}>Queue Status</span>
                    <span style={{ fontWeight: 700, color: '#0369a1' }}>{doc.consultationStatus}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setSelectedDoctor(doc)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#ffffff',
                  color: '#006565',
                  border: '1px solid #006565',
                  borderRadius: '8px',
                  padding: '0.55rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Eye size={16} />
                <span>View Doctor Details</span>
              </button>
            </div>
          ))
        )}
      </div>

      {/* DOCTOR DETAILS MODAL / PANEL */}
      {selectedDoctor && (
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
            maxWidth: '520px',
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
                  {selectedDoctor.name.replace('Dr. ', '').charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {selectedDoctor.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                    {selectedDoctor.department} • {selectedDoctor.doctorId}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
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
              
              {/* Status Header Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f5f9', padding: '0.65rem 1rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>Live Availability:</span>
                {renderStatusBadge(selectedDoctor.status)}
              </div>

              {/* Details List */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
                
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block' }}>MEDICAL REG NO</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    <ShieldCheck size={16} color="#006565" />
                    <span>{selectedDoctor.regNumber}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block' }}>OPD LOCATION</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                    <MapPin size={16} color="#0284c7" />
                    <span>{selectedDoctor.opdRoom}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block' }}>SHIFT TIMINGS</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                    <Clock size={16} color="#d97706" />
                    <span>{selectedDoctor.shiftHours}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'block' }}>SPECIALIZATION</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#1e293b', marginTop: '2px' }}>
                    <Award size={16} color="#10b981" />
                    <span>{selectedDoctor.specialization}</span>
                  </div>
                </div>

              </div>

              {/* Contact Info */}
              <div style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                fontSize: '0.8rem',
                color: '#475569',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={15} color="#64748b" />
                  <span>{selectedDoctor.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={15} color="#64748b" />
                  <span>{selectedDoctor.phone}</span>
                </div>
              </div>

              {/* Today's Activity Summary Box */}
              <div style={{
                backgroundColor: '#f0fdfa',
                border: '1px solid #a7f3d0',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#065f46' }}>TODAY'S CONSULTATION ACTIVITY</div>
                  <div style={{ fontSize: '0.85rem', color: '#047857', marginTop: '2px' }}>
                    <strong>{selectedDoctor.patientsToday}</strong> Patients Consulted • Queue: <strong>{selectedDoctor.consultationStatus}</strong>
                  </div>
                </div>
                <Users size={24} color="#006565" />
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
                onClick={() => alert(`Demo Action: Editing profile for ${selectedDoctor.name}`)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Edit Profile
              </button>

              <button
                type="button"
                onClick={() => setSelectedDoctor(null)}
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

export default DoctorManagement;
