/**
 * CyberWorld-OSAR — OSARProjectionClosure Artifact
 * 
 * OSARProjectionClosure defines the bounded closure-recording
 * layer responsible for preserving the final structural outcome
 * of a completed projection path.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 * - expand visibility
 * - mutate OSAR artifacts
 * - modify world state
 *
 * Closure recording only:
 * - preserves completion lineage
 * - records final projection condition
 * - maintains audit continuity
 * - supports historical verification
 */

import {
  OSARProjectionCompletion,
  validateOSARProjectionCompletion,
} from "./osar-projection-completion";

export type OSARProjectionClosureStatus =
  | "PROJECTION_CLOSURE_RECORDED";

export type OSARProjectionClosureDecision =
  | "CLOSED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection closure artifact.
 */
export interface OSARProjectionClosure {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionClosureStatus;

  /**
   * Completion reference.
   */
  readonly completionReference:
    string;

  /**
   * Closure decision.
   */
  readonly decision:
    OSARProjectionClosureDecision;

  /**
   * Closure reason.
   */
  readonly reason:
    string;

  /**
   * Closure timestamp.
   */
  readonly closedAt:
    string;
}

/**
 * Create projection closure artifact.
 *
 * Closure representation only.
 */
export function createOSARProjectionClosure(input: {
  completion:
    OSARProjectionCompletion;

  reason?: string;
}): OSARProjectionClosure {

  const valid =
    validateOSARProjectionCompletion(
      input.completion,
    );

  return Object.freeze({
    status:
      "PROJECTION_CLOSURE_RECORDED",

    completionReference:
      input.completion.auditReference,

    decision:
      valid &&
      input.completion.decision === "COMPLETED"
        ? "CLOSED"
        : "REVIEW",

    reason:
      input.reason ??
      (
        valid
          ? "PROJECTION_COMPLETION_CONFIRMED"
          : "PROJECTION_COMPLETION_REQUIRES_REVIEW"
      ),

    closedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection closure structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionClosure(
  closure: OSARProjectionClosure,
): boolean {

  return (
    closure.status ===
      "PROJECTION_CLOSURE_RECORDED" &&
    closure.completionReference.length > 0 &&
    closure.reason.length > 0 &&
    closure.closedAt.length > 0 &&
    (
      closure.decision === "CLOSED" ||
      closure.decision === "REVIEW" ||
      closure.decision === "INVALID"
    )
  );
}
