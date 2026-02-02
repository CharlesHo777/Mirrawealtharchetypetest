// src/api/endpoints.ts
import { fetchJSON, fetchText } from "./http";
import type {
  ActiveContentResponse,
  CreateSessionResponse,
  PatchAnswersRequest,
  SubmitSessionRequest,
  SubmitSessionResponse,
} from "./types";

// Content
export function getActiveContent() {
  // GET /content/active
  return fetchJSON<ActiveContentResponse>("/content/active", { method: "GET" });
}

// Sessions
export function createSession() {
  // POST /sessions
  return fetchJSON<CreateSessionResponse>("/sessions", { method: "POST" });
}

export function patchSessionAnswers(sessionId: string, body: PatchAnswersRequest) {
  // PATCH /sessions/:id/answers
  return fetchJSON<{ ok: true } | Record<string, unknown>>(`/sessions/${sessionId}/answers`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

// export function submitSession(sessionId: string, body: SubmitSessionRequest = {}) {
//   // POST /sessions/:id/submit
//   return fetchJSON<SubmitSessionResponse>(`/sessions/${sessionId}/submit`, {
//     method: "POST",
//     body: JSON.stringify(body),
//   });
// }

export function submitSession(sessionId: string, body: Record<string, unknown> = {}) {
  return fetchJSON<SubmitSessionResponse>(`/sessions/${sessionId}/submit`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// Reports
export function getSessionReportHtml(sessionId: string) {
  // GET /sessions/:id/report  -> text/html
  return fetchText(`/sessions/${sessionId}/report`, { method: "GET" });
}
