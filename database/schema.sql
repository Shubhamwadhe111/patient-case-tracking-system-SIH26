-- =============================================================================
-- MEDIKIOSK RELATIONAL DATABASE SCHEMA FOUNDATION (PostgreSQL DDL)
-- Target Database: PostgreSQL 14+
-- =============================================================================

-- Enums
CREATE TYPE user_role AS ENUM ('PATIENT', 'DOCTOR', 'ADMIN');
CREATE TYPE session_status AS ENUM ('INITIATED', 'CONSENT_GRANTED', 'HISTORY_IN_PROGRESS', 'DOCUMENTS_UPLOADING', 'SUMMARY_READY', 'DOCTOR_REVIEWING', 'COMPLETED', 'CANCELLED');
CREATE TYPE doc_type AS ENUM ('PRESCRIPTION', 'LAB_REPORT', 'DISCHARGE_SUMMARY', 'RADIOLOGY', 'OTHER');
CREATE TYPE red_flag_severity AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE red_flag_category AS ENUM ('CARDIOVASCULAR', 'RESPIRATORY', 'NEUROLOGICAL', 'ALLERGY', 'VITAL_ABNORMALITY', 'DRUG_INTERACTION', 'OTHER');

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    role user_role NOT NULL DEFAULT 'PATIENT',
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE,
    preferred_language VARCHAR(10) DEFAULT 'hi',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    dob DATE,
    blood_group VARCHAR(10),
    abha_id VARCHAR(50),
    abha_address VARCHAR(100),
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    opd_block VARCHAR(50)
);

-- 4. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    medical_registration_number VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    department_id VARCHAR(36) REFERENCES departments(id),
    opd_room_number VARCHAR(20) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
);

-- 5. Clinical Sessions Table
CREATE TABLE IF NOT EXISTS clinical_sessions (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id VARCHAR(36) REFERENCES doctors(id),
    department_id VARCHAR(36) REFERENCES departments(id),
    status session_status NOT NULL DEFAULT 'INITIATED',
    kiosk_device_id VARCHAR(100),
    language_code VARCHAR(10) DEFAULT 'hi',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 6. History Responses Log
CREATE TABLE IF NOT EXISTS history_responses (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL REFERENCES clinical_sessions(id) ON DELETE CASCADE,
    question_id VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    answer_raw_text TEXT NOT NULL,
    input_method VARCHAR(20) NOT NULL DEFAULT 'VOICE',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Medical Documents Table
CREATE TABLE IF NOT EXISTS medical_documents (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL REFERENCES clinical_sessions(id) ON DELETE CASCADE,
    patient_id VARCHAR(36) NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    document_type doc_type NOT NULL DEFAULT 'PRESCRIPTION',
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INT NOT NULL,
    ocr_processed BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Extracted Medical Data Table
CREATE TABLE IF NOT EXISTS extracted_medical_data (
    id VARCHAR(36) PRIMARY KEY,
    document_id VARCHAR(36) UNIQUE NOT NULL REFERENCES medical_documents(id) ON DELETE CASCADE,
    raw_text TEXT NOT NULL,
    structured_json JSONB NOT NULL,
    document_date DATE,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Clinical Summaries Table
CREATE TABLE IF NOT EXISTS clinical_summaries (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) UNIQUE NOT NULL REFERENCES clinical_sessions(id) ON DELETE CASCADE,
    patient_id VARCHAR(36) NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    generated_summary_text TEXT NOT NULL,
    history_json JSONB NOT NULL,
    physician_notes TEXT,
    is_doctor_confirmed BOOLEAN DEFAULT FALSE,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Red Flags Table
CREATE TABLE IF NOT EXISTS red_flags (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) NOT NULL REFERENCES clinical_sessions(id) ON DELETE CASCADE,
    severity red_flag_severity NOT NULL DEFAULT 'MEDIUM',
    category red_flag_category NOT NULL DEFAULT 'OTHER',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    source_type VARCHAR(50) NOT NULL,
    recommended_action TEXT,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Consent Records Table
CREATE TABLE IF NOT EXISTS consent_records (
    id VARCHAR(36) PRIMARY KEY,
    patient_id VARCHAR(36) NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    session_id VARCHAR(36) NOT NULL REFERENCES clinical_sessions(id) ON DELETE CASCADE,
    is_ai_processing_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    is_document_ocr_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    is_doctor_sharing_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    language_version VARCHAR(10) DEFAULT 'hi',
    kiosk_id VARCHAR(100),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performant lookup
CREATE INDEX IF NOT EXISTS idx_sessions_patient ON clinical_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_sessions_doctor ON clinical_sessions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_responses_session ON history_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_documents_session ON medical_documents(session_id);
CREATE INDEX IF NOT EXISTS idx_redflags_session ON red_flags(session_id);
