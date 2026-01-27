// src/api/types.ts

export type QuestionType = "LIKERT" | "MCQ" | string;

export interface ApiOption {
  id: string;
  value: string; // what backend validates MCQ against
  label: string; // display text
  order?: number;
  [k: string]: unknown;
}

export interface ApiQuestion {
  id: string;
  type: QuestionType;
  title?: string;
  prompt: string;
  description?: string;
  dimension?: string;
  metadata?: Record<string, unknown>; // likert range etc.
  options?: ApiOption[]; // for MCQ
  order?: number;
  [k: string]: unknown;
}

export interface ActiveContentResponse {
  contentVersion: {
    id: string;
    [k: string]: unknown;
  };
  questions: ApiQuestion[];
  [k: string]: unknown;
}

export interface CreateSessionResponse {
  sessionId: string;
  contentVersionId: string;
}

export type AnswerValue = number | string;

export interface AnswerDTO {
  questionId: string;
  answerValue: AnswerValue;
}

export interface PatchAnswersRequest {
  answers: AnswerDTO[];
}

/**
 * Submit returns a "snapshot" (idempotent) according to your spec.
 * Keep as unknown for now; we’ll define a concrete type once you confirm the shape.
 */
export type ResultSnapshot = unknown;

export interface SubmitSessionRequest {
  email?: string;
}

export interface SubmitSessionResponse {
  resultSnapshot: ResultSnapshot;
  [k: string]: unknown;
}
