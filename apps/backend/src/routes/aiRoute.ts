/**
 * Server-Side AI API Route Handler for CareConnect Clinical History
 */

import fs from 'fs';
import path from 'path';
import { 
  CLINICAL_HISTORY_SYSTEM_PROMPT, 
  buildClinicalHistoryUserPrompt, 
} from '../ai/clinicalHistoryPrompt.js';
import type { GenerateQuestionPayload } from '../ai/clinicalHistoryPrompt.js';

export interface AIResponseData {
  success: boolean;
  question?: {
    questionId: string;
    questionText: string;
    category: string;
    questionOrder: number;
    responseType: 'text' | 'voice';
    placeholderText?: string;
  };
  error?: string;
}

function resolveGeminiApiKey(): string | undefined {
  let key = process.env.GEMINI_API_KEY || 
            process.env.AI_API_KEY || 
            process.env.VITE_GEMINI_API_KEY || 
            process.env.GOOGLE_API_KEY;

  if (!key) {
    try {
      const pathsToSearch = [
        path.resolve(process.cwd(), '.env'),
        path.resolve(process.cwd(), '.env.local'),
        path.resolve(process.cwd(), 'apps/backend/.env'),
        path.resolve(process.cwd(), 'apps/backend/.env.local'),
        path.resolve(process.cwd(), '../.env'),
      ];
      for (const envPath of pathsToSearch) {
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, 'utf-8');
          const lines = content.split(/\r?\n/);
          for (let line of lines) {
            line = line.trim();
            if (line.startsWith('#') || !line.includes('=')) continue;
            const eqIdx = line.indexOf('=');
            const varName = line.substring(0, eqIdx).trim();
            if (['GEMINI_API_KEY', 'AI_API_KEY', 'VITE_GEMINI_API_KEY', 'GOOGLE_API_KEY'].includes(varName)) {
              let rawVal = line.substring(eqIdx + 1).trim();
              if (rawVal.includes('#')) {
                rawVal = rawVal.substring(0, rawVal.indexOf('#')).trim();
              }
              rawVal = rawVal.replace(/^["']|["']$/g, '').trim();
              if (rawVal) {
                key = rawVal;
                break;
              }
            }
          }
          if (key) break;
        }
      }
    } catch (_) {}
  }
  return key;
}

export async function processClinicalHistoryAIRequest(payload: GenerateQuestionPayload): Promise<AIResponseData> {
  const apiKey = resolveGeminiApiKey();

  if (!apiKey) {
    return {
      success: false,
      error: 'GEMINI_API_KEY environment variable is not configured on the backend server. Please place GEMINI_API_KEY=your_key in a .env file in the project root.',
    };
  }

  try {
    const userPrompt = buildClinicalHistoryUserPrompt(payload);
    // Standard Gemini 1.5 Flash endpoint
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${CLINICAL_HISTORY_SYSTEM_PROMPT}\n\nUSER PROMPT:\n${userPrompt}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 300,
        responseMimeType: 'application/json',
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API request failed:', response.status, errText);
      return {
        success: false,
        error: `AI Provider returned status ${response.status}: ${errText.slice(0, 100)}`,
      };
    }

    const data = (await response.json()) as any;
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return {
        success: false,
        error: 'Empty response payload from AI Provider.',
      };
    }

    // Clean potential markdown fencing
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    // Validate required fields
    if (!parsed.questionText || !parsed.category) {
      return {
        success: false,
        error: 'Invalid AI response schema structure.',
      };
    }

    return {
      success: true,
      question: {
        questionId: parsed.questionId || `ai_q_${Date.now()}`,
        questionText: parsed.questionText,
        category: parsed.category,
        questionOrder: parsed.questionOrder || payload.currentIndex + 1,
        responseType: 'text',
        placeholderText: parsed.placeholderText || 'Type your answer here...',
      },
    };

  } catch (err: any) {
    console.warn('Error processing Clinical History AI request:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Server error communicating with AI Provider',
    };
  }
}
