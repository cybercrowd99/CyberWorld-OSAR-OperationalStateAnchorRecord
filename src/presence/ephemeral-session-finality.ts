 /**
  * CyberWorld Ephemeral Session Finality
  * 
  * Purpose:
  * - Record the terminal structural state of an ephemeral session lifecycle.
  * - Preserve finality continuity after closure.
  * - Maintain minimal finality references in the MDC.
  *
  * Does NOT:
  * - store session content
  * - restore dissolved sessions
  * - create identity
  * - track behavior
  * - preserve communication history
  * - authorize future actions
  */

export type EphemeralFinalityState =
  | "FINALIZED"
  | "REVIEW";


export interface EphemeralSessionFinality {
  readonly status:
    "EPHEMERAL_SESSION_FINALITY_RECORDED";

  /**
   * Immutable finality anchor.
   */
  readonly finalityReference: string;

  /**
   * Parent closure reference.
   */
  readonly closureReference: string;

  /**
   * Session lifecycle reference.
   */
  readonly sessionReference: string;

  /**
   * Structural completion witness.
   */
  readonly completionWitness: string;

  readonly finalityState:
    EphemeralFinalityState;

  readonly createdAt: number;
}


export interface CreateEphemeralFinalityRequest {
  readonly closureReference: string;
  readonly sessionReference: string;
  readonly completionWitness: string;
}


/**
 * Creates a minimal finality receipt.
 *
 * Finality is a lifecycle checkpoint,
 * not a record of interaction.
 */
export const createEphemeralSessionFinality = (
  request: CreateEphemeralFinalityRequest
): EphemeralSessionFinality => {

  const valid =
    Boolean(request.closureReference) &&
    Boolean(request.sessionReference) &&
    Boolean(request.completionWitness);

  if (!valid) {
    throw new Error(
      "INVALID_EPHEMERAL_SESSION_FINALITY_REQUEST"
    );
  }

  return Object.freeze({
    status:
      "EPHEMERAL_SESSION_FINALITY_RECORDED",

    finalityReference:
      `finality:${crypto.randomUUID()}`,

    closureReference:
      request.closureReference,

    sessionReference:
      request.sessionReference,

    completionWitness:
      request.completionWitness,

    finalityState:
      "FINALIZED",

    createdAt:
      Date.now(),
  });
};


/**
 * Passive structural finality validation.
 */
export const validateEphemeralSessionFinality = (
  finality: EphemeralSessionFinality
): boolean => {

  return (
    finality.status ===
      "EPHEMERAL_SESSION_FINALITY_RECORDED" &&

    Boolean(finality.finalityReference) &&
    Boolean(finality.closureReference) &&
    Boolean(finality.sessionReference) &&
    Boolean(finality.completionWitness) &&

    Number.isFinite(finality.createdAt)
  );
};


/**
 * Structural finality evaluation only.
 */
export const evaluateEphemeralSessionFinality = (
  finality: EphemeralSessionFinality
): EphemeralFinalityState => {

  return validateEphemeralSessionFinality(finality)
    ? "FINALIZED"
    : "REVIEW";
};
