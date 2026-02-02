// src/api/types.ts

export type QuestionType = "likert" | "mcq" | string;

export interface ApiOption {
  id: string;
  value: string;
  label: string;
  order?: number;
}

export interface ApiQuestion {
  id: string;
  text: string;        // <-- backend uses "text"
  type: QuestionType;  // <-- "likert" | "mcq"
  order?: number;
  metadata?: Record<string, unknown>;
  options: ApiOption[]; // backend sends [] for likert
}

export interface ActiveContentResponse {
  contentVersionId: string;
  versionName?: string;
  questions: ApiQuestion[];
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

export interface SubmitSessionRequest {
  email?: string;
}

export interface SubmitSessionResponse {
  resultSnapshot: ResultSnapshot;
  [k: string]: unknown;
}

export type TraitKey = "preserver" | "expander" | "anchor" | "flow";

// If your archetype keys are fixed, make this a union later.
// For now keep it as string to avoid breaking when you add more archetypes.
export type ArchetypeKey = string;

export interface TraitPairWinner {
  pair: [string, string];   // e.g. ["preserver","expander"]
  winner: string;           // e.g. "preserver"
}

export interface ResultBreakdown {
  pickedBy: string;                 // e.g. "traitPairs"
  winners: TraitPairWinner[];
  margins: number[];
}

export interface ResultSnapshot {
  traitScores: Record<string, number>;  // e.g. { preserver: 4, expander: 1, ... }
  archetypeKey: ArchetypeKey;           // e.g. "builder"
  archetypeName: string;               // e.g. "The Builder"
  confidence: number;                  // e.g. 0.1857...
  breakdown: ResultBreakdown;
}

export interface SubmitSessionResponse {
  sessionId: string;
  contentVersionId: string;
  resultSnapshot: ResultSnapshot;
  submittedAt: string; // ISO datetime string
}
