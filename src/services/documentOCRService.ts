/**
 * Medical Document OCR & Entity Extraction Service Interface (Phase 1 Placeholder Contract)
 * To be fully implemented in Phase 4.
 */

import type { MedicalDocument, ExtractedMedicalData } from '../types/document';

export interface IDocumentOCRService {
  isServiceReady(): boolean;
  processDocument(document: MedicalDocument): Promise<ExtractedMedicalData>;
}

export class Phase1DocumentOCRService implements IDocumentOCRService {
  isServiceReady(): boolean {
    return false; // Phase 1 architectural contract only
  }

  async processDocument(_document: MedicalDocument): Promise<ExtractedMedicalData> {
    throw new Error('Medical Document OCR & Entity Extraction module is scheduled for Phase 4 implementation.');
  }
}

export const documentOCRService = new Phase1DocumentOCRService();
