# CareConnect - AI-Powered Patient Case Tracking & Clinical History System

[![SIH Problem Statement](https://img.shields.io/badge/SIH%20Problem%20Statement-SIH26047-blue.svg)](https://sih.gov.in)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=nodedotjs)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?logo=prisma)](https://www.prisma.io/)

---

## 📌 Project Overview

**CareConnect** is an integrated, multi-lingual clinical history-taking, document digitization, and patient case tracking platform designed specifically for high-density Outpatient Departments (OPD) in Indian healthcare institutions. 

In Indian public and private hospitals, physicians face extreme time constraints during OPD consultations, spending significant time capturing baseline medical histories and sorting through legacy paper records. CareConnect addresses this challenge by providing an automated, patient-friendly pre-consultation intake kiosk and mobile experience that compiles structured clinical summaries and alerts doctors to potential red-flag medical risks before the patient enters the consultation room.

---

## 🎯 SIH Problem Statement ID: SIH26047

- **Problem Title**: Smart Patient Case Tracking & AI Clinical Intake Platform for OPDs
- **Target Domain**: Healthcare & MedTech
- **Core Objective**: Reduce OPD wait times, eliminate manual paper bottlenecks, support regional language barriers, enforce DPDP compliant digital consent, and empower physicians with AI-assisted clinical summaries.

---

## 🏗 System Architecture & Monorepo Structure

CareConnect is organized as a modular TypeScript monorepo using npm workspaces:

```
patient-case-tracking-system-SIH26/
├── apps/
│   ├── patient-kiosk/       # React Native / Expo tablet kiosk & mobile web intake portal
│   ├── hospital-portal/    # Hospital desk registration, queue management & admin portal
│   ├── doctor-portal/      # Physician clinical workstation & AI summary review interface
│   └── backend/            # Node.js + Express REST API server with Prisma ORM & AI services
├── packages/
│   ├── shared-types/       # Shared TypeScript models (User, Patient, Doctor, Session, Consent)
│   ├── shared-config/      # System configurations & 8-Phase system architecture definitions
└── src/                    # Core web application components, UI elements & services
├── database/               # PostgreSQL DDL scripts, Prisma schema & repository models
└── docs/                   # System architecture documentation and 8-Phase roadmap
```

---

## ✨ Key Features & Portals

### 📱 1. Patient Mobile App & Tablet Kiosk (`/apps/patient-kiosk`)
- **Multilingual Support**: Interactive interface supporting **8 regional Indian languages** (Hindi, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada, and English).
- **ABHA & New Profile Registration**: Integration support for Ayushman Bharat Health Account (ABHA) IDs and rapid new patient registration.
- **DPDP Act Compliant Consent**: Explicit digital consent capture for data processing and medical record sharing.
- **Interactive Visual Body Map**: Touch-based visual body map allowing patients to pinpoint pain locations and symptoms without medical jargon.
- **Pre-Encounter Triage**: Guided questionnaire capturing onset, severity, past medical history, and existing medications.

### 🏢 2. Hospital Web App (`/apps/hospital-portal`)
- **OPD Queue & Token Dispatch**: Real-time patient check-in, token generation, and triage status tracking.
- **Department Routing**: Automatic routing to Cardiology, Orthopedics, General Medicine, Pediatrics, etc.
- **Hospital Analytics Dashboard**: Real-time metrics on patient inflow, average wait times, and high-risk flags.

### 🩺 3. Doctor Workstation & Functionality (`/apps/doctor-portal`)
- **AI Clinical Summary Review**: Instant pre-consultation summary powered by Gemini API, condensing multi-page intake into concise clinical highlights.
- **Automated Red-Flag Risk Warnings**: Instant alerts for critical conditions (e.g., chest pain, hypertensive crisis, acute dyspnea).
- **Interactive Patient Timeline**: Longitudinal history of previous hospital visits, past diagnoses, and digitized lab reports.
- **E-Prescription & ICD-11 Tagging**: Structured clinical note-taking with diagnostic coding and prescription generation.

---

## 🛠 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Frameworks** | React 19, Vite, Tailwind CSS, Lucide Icons, React Router v7 |
| **Mobile / Kiosk** | Expo / React Native Web |
| **Backend Services** | Node.js, Express, TypeScript |
| **Database & ORM** | PostgreSQL 14+, Prisma ORM |
| **AI & NLP Integration** | Google Gemini API (Server-side LLM for clinical summarization) |
| **Document Processing** | Cloud OCR / Tesseract for medical record scanning |
| **Monorepo Architecture** | npm workspaces, TypeScript Project References |

---

## 🚀 Current Implemented Features vs 🔮 Future Roadmap

### ✅ Currently Implemented (Phases 1 - 3)
- [x] Full monorepo structure with shared TypeScript packages (`@medikiosk/shared-types`, `@medikiosk/shared-config`).
- [x] Patient Kiosk multi-step onboarding (Language selection, ABHA/New Profile, DPDP Consent, Department, Symptom Triage).
- [x] Express REST backend (`/api/health`, `/api/patients`, `/api/sessions`, `/api/consent`).
- [x] Database schemas (Prisma schema `schema.prisma` and relational PostgreSQL `schema.sql`).
- [x] Initial Doctor Portal dashboard & summary review foundation.
- [x] Interactive web intake application with Vite & Tailwind CSS.

### 🔮 Planned / Future Roadmap (Phases 4 - 8)
- [ ] **Voice-to-Text Conversational Intake**: Real-time regional voice recognition for illiterate/elderly patients.
- [ ] **Automated Prescription OCR**: AI-driven optical character recognition for physical prescription upload.
- [ ] **Full ABHA OAuth 2.0 Integration**: Live integration with ABDM / NDHM Health Stack.
- [ ] **Offline-First Sync**: Local SQLite sync for rural health centers with intermittent connectivity.
- [ ] **Federated Hospital Analytics**: Anonymized population health metrics across hospital networks.

---

## 💻 Local Setup & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: v14 or higher (optional for local database connection)

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Shubhamwadhe111/patient-case-tracking-system-SIH26.git
   cd patient-case-tracking-system-SIH26
   ```

2. **Install Workspace Dependencies**
   ```bash
   npm install
   ```

3. **Configure Backend Environment Variables**
   Create a `.env` file inside `apps/backend/`:
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   ```

4. **Start Development Servers**
   To start the main application web interface:
   ```bash
   npm run dev
   ```

5. **Build All Workspace Packages & Apps**
   To verify compilation across all monorepo workspaces:
   ```bash
   # Root compilation
   npm run build

   # Workspace compilations
   npm run build:packages
   npm run build:backend
   npm run build:patient-kiosk
   npm run build:doctor-portal
   npm run build:hospital-portal
   ```

---

## 🔑 Required Environment Variables

Configure the following variables in `apps/backend/.env`:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Backend API Server Port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/careconnect_db` |
| `GEMINI_API_KEY` | Google Gemini API key for AI summary & red flags | `your_gemini_api_key_here` |

> 🔒 **CRITICAL SECURITY NOTE**: The `GEMINI_API_KEY` must **ALWAYS remain strictly server-side** in `apps/backend`. Never expose API keys or secrets in client-side applications, public code repositories, or frontend bundles.

---

## 📜 License & Acknowledgments

Developed for **Smart India Hackathon 2026 (SIH26)** under Problem Statement **SIH26047**.
Designed for Indian Healthcare Systems, ABDM compliance, and DPDP Act adherence.
