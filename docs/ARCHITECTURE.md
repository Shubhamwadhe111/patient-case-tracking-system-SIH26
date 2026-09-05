# CareConnect System Architecture (Option B Monorepo)

CareConnect is an AI-powered clinical history-taking and medical document digitization platform for Indian hospitals.

---

## High-Level Architecture Overview

```
                        CareConnect Ecosystem (Option B)
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌───────────────┐             ┌───────────────┐             ┌───────────────┐
│ Patient Kiosk │             │ Doctor Portal │             │  Backend API  │
│ React Native  │             │ React + TS    │             │ Node.js + TS  │
│  + Expo Web   │             │ Physician Web │             │ Express REST  │
└───────┬───────┘             └───────┬───────┘             └───────┬───────┘
        │                             │                             │
        └─────────────────────────────┼─────────────────────────────┘
                                      ▼
                        ┌───────────────────────────┐
                        │    PostgreSQL Database    │
                        │ Relational DDL & Prisma   │
                        └───────────────────────────┘
```

---

## Directory Organization

```
/apps
  /patient-kiosk     # React Native + Expo tablet kiosk & web onboarding
  /doctor-portal     # React + TypeScript physician portal
  /backend           # Node.js + Express API server

/packages
  /shared-types      # Shared domain models (User, Patient, Doctor, Session, Consent)
  /shared-config     # Shared system config & 8-Phase Roadmap definition

/database
  schema.sql         # PostgreSQL DDL
  schema.prisma      # Prisma ORM definition
  models.ts          # Database repository interfaces

/docs
  ARCHITECTURE.md
  ROADMAP.md
```

---

## Key Modules & Phase Readiness

1. **Patient Kiosk (`apps/patient-kiosk`)**:
   - Phase 1 & 2 Ready: Welcome, Language Selection (8 regional Indian languages), Identification (ABHA Mock / New), Profile Registration, DPDP Consent, Department Selection, and Onboarding Summary.

2. **Doctor Portal (`apps/doctor-portal`)**:
   - Phase 1 Foundation Ready: Prepared for Phase 6 OPD Queue & Physician Summary Review.

3. **Backend API (`apps/backend`)**:
   - Node.js + TypeScript REST service configured with `process.env.DATABASE_URL` (zero hardcoded secrets).
   - Routes: `/api/health`, `/api/patients`, `/api/sessions`, `/api/consent` active; `/api/ai`, `/api/ocr`, `/api/clinical-summary`, `/api/red-flags`, `/api/integrations` reserved for Phase 3+.

4. **Database (`database/`)**:
   - PostgreSQL 14+ schema covering 10 core entities (`users`, `patients`, `doctors`, `departments`, `clinical_sessions`, `history_responses`, `medical_documents`, `extracted_medical_data`, `clinical_summaries`, `red_flags`, `consent_records`).
