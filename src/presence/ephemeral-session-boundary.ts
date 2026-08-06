/**
 * CyberWorld Ephemeral Session Boundary
 * 
 * Purpose:
 * - create bounded temporary interaction sessions
 * - preserve session sovereignty
 * - prevent permanent relationship capture
 *
 * Does NOT:
 * - create identity records
 * - store conversation history
 * - track behavior
 * - establish ownership
 * - authorize future actions
 * - preserve session content after dissolution
 */


export type EphemeralSessionState =
  | "OPEN"
  | "CLOSED"
  | "DISSOLVED";


export type SessionBoundaryDecision =
  | "VALID"
  | "REVIEW";


export interface EphemeralSessionBoundary {

  readonly status:
    "EPHEMERAL_SESSION_BOUNDARY_RECORDED";

  /**
   * Temporary session anchor.
   * Not an identity reference.
   */
  readonly sessionReference: string;

  /**
   * Links to temporary presence only.
   */
  readonly presenceReference: string;

  /**
   * Ephemeral cryptographic session anchor.
   */
  readonly sessionKeyReference: string;

  readonly state:
    EphemeralSessionState;

  /**
   * Session validity window.
   */
  readonly expiresAt: number;

  readonly createdAt: number;
}


export interface CreateSessionRequest {

  readonly presenceReference: string;

  readonly sessionKeyReference: string;

  readonly ttl: number;
}


/**
 * Creates an ephemeral interaction boundary.
 *
 * Session exists only inside its TTL window.
 */
export const createEphemeralSessionBoundary = (
  request: CreateSessionRequest,
): EphemeralSessionBoundary => {

  const valid =
    Boolean(request.presenceReference) &&
    Boolean(request.sessionKeyReference) &&
    Number.isFinite(request.ttl) &&
    request.ttl > 0;


  if (!valid) {
    throw new Error(
      "INVALID_EPHEMERAL_SESSION_REQUEST"
    );
  }


  return Object.freeze({

    status:
      "EPHEMERAL_SESSION_BOUNDARY_RECORDED",

    sessionReference:
      `session:${crypto.randomUUID()}`,

    presenceReference:
      request.presenceReference,

    sessionKeyReference:
      request.sessionKeyReference,

    state:
      "OPEN",

    expiresAt:
      Date.now() + request.ttl,

    createdAt:
      Date.now(),

  });
};


/**
 * Passive structural session validation.
 *
 * Does not inspect session content.
 */
export const evaluateSessionBoundary = (
  session: EphemeralSessionBoundary,
  currentTime: number = Date.now(),
): SessionBoundaryDecision => {

  if (
    session.state !== "OPEN" ||
    currentTime >= session.expiresAt
  ) {
    return "REVIEW";
  }


  return "VALID";
};


/**
 * Ends the temporary session.
 *
 * No history is created.
 */
export const closeEphemeralSessionBoundary = (
  session: EphemeralSessionBoundary,
): EphemeralSessionBoundary => {

  return Object.freeze({

    ...session,

    state:
      "CLOSED",

  });
};


/**
 * Final entropy transition.
 *
 * The boundary ends without preserving interaction residue.
 */
export const dissolveEphemeralSessionBoundary = (
  session: EphemeralSessionBoundary,
): EphemeralSessionBoundary => {

  return Object.freeze({

    ...session,

    state:
      "DISSOLVED",

  });
};


/**
 * Structural validation only.
 */
export const validateEphemeralSessionBoundary = (
  session: EphemeralSessionBoundary,
): boolean => {

  return (

    session.status ===
      "EPHEMERAL_SESSION_BOUNDARY_RECORDED" &&

    Boolean(session.sessionReference) &&

    Boolean(session.presenceReference) &&

    Boolean(session.sessionKeyReference) &&

    Number.isFinite(session.expiresAt) &&

    Number.isFinite(session.createdAt)

  );
};
