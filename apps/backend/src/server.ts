/**
 * CareConnect Backend API Express/Node.js Server Entry
 * Option B Monorepo API Architecture
 */

import { getDBConfig } from './config/db.js';

export interface RouteModule {
  prefix: string;
  description: string;
  phaseReady: number;
}

export const API_ROUTES: RouteModule[] = [
  { prefix: '/api/health', description: 'System health & status endpoint', phaseReady: 1 },
  { prefix: '/api/patients', description: 'Patient demographic & profile endpoints', phaseReady: 2 },
  { prefix: '/api/sessions', description: 'Clinical session workflow state tracker', phaseReady: 2 },
  { prefix: '/api/consent', description: 'Privacy consent logging endpoints', phaseReady: 2 },
  { prefix: '/api/ai', description: 'Conversational AI questioning contract (Phase 3 placeholder)', phaseReady: 3 },
  { prefix: '/api/ocr', description: 'Medical document OCR contract (Phase 4 placeholder)', phaseReady: 4 },
  { prefix: '/api/clinical-summary', description: 'Structured summary synthesis contract (Phase 5 placeholder)', phaseReady: 5 },
  { prefix: '/api/red-flags', description: 'Red-flag urgency triage contract (Phase 7 placeholder)', phaseReady: 7 },
  { prefix: '/api/integrations', description: 'ABHA / ABDM / HIS integration contract (Phase 8 placeholder)', phaseReady: 8 },
];

export class CareConnectAPIServer {
  private port: number;

  constructor() {
    this.port = Number(process.env.PORT) || 5000;
  }

  public getStatus() {
    const dbConfig = getDBConfig();
    return {
      service: 'CareConnect Backend API',
      status: 'UP',
      version: '1.0.0-optionB',
      port: this.port,
      databaseConfigured: !!dbConfig.databaseUrl,
      activePhase: 2,
      routes: API_ROUTES,
      timestamp: new Date().toISOString(),
    };
  }
}

export const server = new CareConnectAPIServer();
