/**
 * Speech-To-Text Voice Service Interface (Phase 1 Placeholder Contract)
 * To be fully implemented in Phase 3.
 */

export interface SpeechToTextConfig {
  languageCode: string;
  sampleRateHz: number;
}

export interface ISpeechToTextService {
  isSupportedInBrowser(): boolean;
  startListening(config: SpeechToTextConfig, onResult: (text: string) => void): Promise<void>;
  stopListening(): Promise<void>;
}

export class Phase1SpeechToTextService implements ISpeechToTextService {
  isSupportedInBrowser(): boolean {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  async startListening(_config: SpeechToTextConfig, _onResult: (text: string) => void): Promise<void> {
    throw new Error('Speech-to-Text integration is scheduled for Phase 3 implementation.');
  }

  async stopListening(): Promise<void> {
    // Phase 1 stub
  }
}

export const speechToTextService = new Phase1SpeechToTextService();
