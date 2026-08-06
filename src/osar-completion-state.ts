/**
 * CyberWorld-OSAR — OSARCompletionState Artifact
 * 
 * OSARCompletionState defines the bounded completion layer
 * responsible for representing the final structural condition
 * of an OSAR processing path.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize actions
 * - modify operational state
 * - modify world state
 * - bypass lifecycle rules
 *
 * Completion representation only:
 * - records completion condition
 * - preserves audit lineage
 * - preserves validation lineage
 * - confirms controlled closure
 */

import {
  OSARAuditRecord,
  validateOSARAuditRecord,
} from "./osar-audit-record";

export type OSARCompletionStateStatus =
  | "COMPLETION_RECORDED";

export type OSARCompletionDecision =
  | "COMPLETED"
  | "REVIEW"
  | "INCOMPLETE";

/**
 * Completion artifact.
 */
export interface OSARCompletionState {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARCompletionStateStatus;

  /**
   * Audit reference.
   */
  readonly auditReference:
    string;

  /**
   * Completion decision.
   */
  readonly decision:
    OSARCompletionDecision;

  /**
   * Completion reason.
   */
  readonly reason:
    string;

  /**
   * Completion timestamp.
   */
  readonly completedAt:
    string;
}

/**
 * Create completion state artifact.
 *
 * Closure representation only.
 */
export function createOSARCompletionState(input: {
  auditRecord:
    OSARAuditRecord;

  reason:
    string;
}): OSARCompletionState {

  const decision: OSARCompletionDecision =
    validateOSARAuditRecord(
      input.auditRecord,
    )
      ? "COMPLETED"
      : "REVIEW";

  return Object.freeze({
    status:
      "COMPLETION_RECORDED",

    auditReference:
      input.auditRecord.integrityReference,

    decision,

    reason:
      input.reason,

    completedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate completion state structure.
 *
 * Structural validation only.
 */
export function validateOSARCompletionState(
  state: OSARCompletionState,
): boolean {

  return (
    state.status ===
      "COMPLETION_RECORDED" &&
    state.auditReference.length > 0 &&
    state.reason.length > 0 &&
    state.completedAt.length > 0 &&
    (
      state.decision === "COMPLETED" ||
      state.decision === "REVIEW" ||
      state.decision === "INCOMPLETE"
    )
  );
}
