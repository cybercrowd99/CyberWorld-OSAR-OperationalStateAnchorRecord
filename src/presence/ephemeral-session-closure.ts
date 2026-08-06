/**
 * CyberWorld Ephemeral Session Closure
 * 
 * Purpose:
 * - Record the structural completion of an ephemeral session.
 * - Confirm channel/session lifecycle termination.
 * - Preserve minimal closure continuity in the MDC.
 */

export type EphemeralClosureState = "CLOSED" | "REVIEW";

export interface EphemeralSessionClosure {
  readonly status: "EPHEMERAL_SESSION_CLOSURE_RECORDED";

  /**
   * Immutable closure anchor.
   */
  readonly closureReference: string;

  /**
   * Parent session boundary reference.
   */
  readonly sessionReference: string;

  /**
   * Channel lifecycle reference.
   */
  readonly channelReference: string;

  /**
   * Structural completion witness.
   */
  readonly completionWitness: string;

  readonly closureState: EphemeralClosureState;

  readonly createdAt: number;
}

export interface CreateEphemeralClosureRequest {
  readonly sessionReference: string;
  readonly channelReference: string;
  readonly completionWitness: string;
}

/**
 * Creates a minimal closure receipt.
 *
 * Closure is a receipt of completion,
 * not a record of interaction.
 */
export const createEphemeralSessionClosure = (
  request: CreateEphemeralClosureRequest
): EphemeralSessionClosure => {
  const valid =
    Boolean(request.sessionReference) &&
    Boolean(request.channelReference) &&
    Boolean(request.completionWitness);

  if (!valid) {
    throw new Error(
      "INVALID_EPHEMERAL_SESSION_CLOSURE_REQUEST"
    );
  }

  return Object.freeze({
    status:
      "EPHEMERAL_SESSION_CLOSURE_RECORDED",

    closureReference:
      `closure:${crypto.randomUUID()}`,

    sessionReference:
      request.sessionReference,

    channelReference:
      request.channelReference,

    completionWitness:
      request.completionWitness,

    closureState:
      "CLOSED",

    createdAt:
      Date.now(),
  });
};

/**
 * Passive structural closure validation.
 */
export const validateEphemeralSessionClosure = (
  closure: EphemeralSessionClosure
): boolean => {
  return (
    closure.status ===
      "EPHEMERAL_SESSION_CLOSURE_RECORDED" &&

    Boolean(closure.closureReference) &&
    Boolean(closure.sessionReference) &&
    Boolean(closure.channelReference) &&
    Boolean(closure.completionWitness) &&

    Number.isFinite(closure.createdAt)
  );
};

/**
 * Structural closure evaluation only.
 */
export const evaluateEphemeralSessionClosure = (
  closure: EphemeralSessionClosure
): EphemeralClosureState => {
  return validateEphemeralSessionClosure(closure)
    ? "CLOSED"
    : "REVIEW";
};
