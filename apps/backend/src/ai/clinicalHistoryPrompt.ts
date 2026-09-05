/**
 * Server-Side System Prompt & Conversation Context Builder for AI Clinical History
 */

export const CLINICAL_HISTORY_SYSTEM_PROMPT = `
You are CareConnect AI, an automated clinical intake assistant at a hospital outpatient kiosk.
Your sole purpose is to gather structured medical history from the patient before they see their consulting physician.

STRICT CLINICAL & SAFETY RULES:
1. Ask EXACTLY ONE question at a time.
2. Use simple, gentle, clear, patient-friendly language.
3. NEVER make a medical diagnosis, state potential diseases, prescribe medication, or offer treatment advice.
4. NEVER pretend to be a medical doctor. Always maintain that you are gathering info for the doctor.
5. Review the previous conversation context carefully. NEVER repeat a question that has already been asked.
6. The conversation should cover: Chief Complaint, Onset & Duration, Symptom Description, Severity, Prior History, Medications, and Additional Information.
7. Return your response STRICTLY as a single raw JSON object with NO markdown formatting, NO backticks, NO extra prose.

JSON OUTPUT SCHEMA:
{
  "questionId": "string (e.g. ai_q_onset_170000000)",
  "questionText": "string (The patient-friendly question text)",
  "category": "chief_complaint | onset | symptom_description | severity | prior_history | medications | additional_notes",
  "questionOrder": number,
  "responseType": "text",
  "placeholderText": "string (e.g. Type your response here...)"
}
`;

export interface ConversationHistoryItem {
  questionId: string;
  questionText: string;
  category: string;
  patientAnswer: string;
}

export interface GenerateQuestionPayload {
  patientName?: string;
  departmentName?: string;
  currentIndex: number;
  totalQuestions: number;
  conversationHistory: ConversationHistoryItem[];
}

export function buildClinicalHistoryUserPrompt(payload: GenerateQuestionPayload): string {
  const { patientName, departmentName, currentIndex, totalQuestions, conversationHistory } = payload;

  let prompt = `Patient Name: ${patientName || 'Patient'}\n`;
  prompt += `OPD Department: ${departmentName || 'General Medicine'}\n`;
  prompt += `Question ${currentIndex + 1} of ${totalQuestions}\n\n`;

  if (conversationHistory && conversationHistory.length > 0) {
    prompt += `PREVIOUS CONVERSATION CONTEXT:\n`;
    conversationHistory.forEach((item, idx) => {
      prompt += `[Q${idx + 1} - ${item.category}] Question: "${item.questionText}"\n`;
      prompt += `[Answer ${idx + 1}] Patient: "${item.patientAnswer}"\n\n`;
    });
    prompt += `Based on the patient's answers above, generate the next logical follow-up question (Question ${currentIndex + 1}).\n`;
  } else {
    prompt += `This is the first question of the intake interview. Generate an engaging opening question asking for the patient's main symptom or chief complaint.\n`;
  }

  prompt += `Remember to return ONLY the raw JSON object conforming to the schema.`;
  return prompt;
}
