/**
 * Speech-to-Text (STT) Service Abstraction (Phase 3D Step 2)
 * 
 * Uses Web Speech API (SpeechRecognition / webkitSpeechRecognition) with clean fallback.
 * Modular design allows cloud STT providers (e.g. Google Cloud Speech-to-Text, Whisper)
 * to plug in seamlessly in future phases.
 */

export interface STTCallbacks {
  onStart?: () => void;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (errorMessage: string) => void;
  onEnd?: () => void;
}

export interface ISpeechToTextService {
  isSupported(): boolean;
  start(callbacks: STTCallbacks): void;
  stop(): void;
  abort(): void;
}

export class BrowserSpeechToTextService implements ISpeechToTextService {
  private recognition: any = null;
  private isListening: boolean = false;

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition
    );
  }

  public start(callbacks: STTCallbacks): void {
    if (!this.isSupported()) {
      callbacks.onError?.('Speech Recognition is not supported in this browser. Please use text input.');
      return;
    }

    try {
      const SpeechRecognition = 
        (window as any).SpeechRecognition || 
        (window as any).webkitSpeechRecognition;

      if (this.recognition) {
        try {
          this.recognition.abort();
        } catch (_) {}
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US'; // English (India / US)

      let finalTranscript = '';

      this.recognition.onstart = () => {
        this.isListening = true;
        callbacks.onStart?.();
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          const text = result[0]?.transcript || '';
          if (result.isFinal) {
            finalTranscript += text + ' ';
          } else {
            interimTranscript += text;
          }
        }

        const combinedText = (finalTranscript + interimTranscript).trim();
        const isFinal = event.results[event.results.length - 1]?.isFinal || false;
        
        callbacks.onResult?.(combinedText, isFinal);
      };

      this.recognition.onerror = (event: any) => {
        const errorType = event.error;
        let userFriendlyMsg = 'Voice recognition error occurred. You can continue with text input.';

        if (errorType === 'not-allowed' || errorType === 'service-not-allowed') {
          userFriendlyMsg = 'Microphone permission was denied. Please allow microphone access or use text input.';
        } else if (errorType === 'no-speech') {
          userFriendlyMsg = 'No speech was detected. Please try speaking again or type your answer.';
        } else if (errorType === 'network') {
          userFriendlyMsg = 'Network error during voice recognition. Switching to text input.';
        } else if (errorType === 'audio-capture') {
          userFriendlyMsg = 'No microphone hardware found. Please use text input below.';
        }

        callbacks.onError?.(userFriendlyMsg);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        callbacks.onEnd?.();
      };

      this.recognition.start();
    } catch (e: any) {
      this.isListening = false;
      callbacks.onError?.(e?.message || 'Unable to start speech recognition.');
    }
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (_) {}
      this.isListening = false;
    }
  }

  public abort(): void {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (_) {}
      this.isListening = false;
    }
  }
}

export const sttService: ISpeechToTextService = new BrowserSpeechToTextService();
