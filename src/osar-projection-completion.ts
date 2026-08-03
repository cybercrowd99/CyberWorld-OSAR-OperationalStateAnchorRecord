/**
 * CyberWorld-OSAR — OSARProjectionCompletion Artifact
 *
 * OSARProjectionCompletion defines the bounded completion layer
 * responsible for representing closure of a controlled projection
 * path after audit verification.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 * - expand visibility
 * - modify OSAR artifacts
 * - modify world state
 *
 * Completion representation only:
 * - preserves audit lineage
 * - records projection closure
 * - maintains lifecycle continuity
 * - supports controlled completion verification
 */

import {
  OSARProjectionAuditTrail,
  validateOSARProjectionAuditTrail,
} from "./osar-projection-audit-trail";

export type OSARProjectionCompletionStatus =
  | "PROJECTION_COMPLETION_RECORDED";

export type OSARProjectionCompletionDecision =
  | "COMPLETED"
  | "REVIEW"
  | "FAILED";

/**
 * Projection completion artifact.
 */
export interface OSARProjectionCompletion {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionCompletionStatus;

  /**
   * Audit trail reference.
   */
  readonly auditReference:
    string;

  /**
   * Completion decision.
   */
  readonly decision:
    OSARProjectionCompletionDecision;

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
 * Create projection completion artifact.
 *
 * Closure representation only.
 */
export function createOSARProjectionCompletion(input: {
  audit:
    OSARProjectionAuditTrail;

  reason?: string;
}): OSARProjectionCompletion {

  const valid =
    validateOSARProjectionAuditTrail(
      input.audit,
    );

  return Object.freeze({
    status:
      "PROJECTION_COMPLETION_RECORDED",

    auditReference:
      input.audit.traceReference,

    decision:
      valid &&
      input.audit.decision === "RECORDED"
        ? "COMPLETED"
        : "REVIEW",

    reason:
      input.reason ??
      (
        valid
          ? "PROJECTION_AUDIT_COMPLETED"
          : "PROJECTION_AUDIT_REQUIRES_REVIEW"
      ),

    completedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection completion structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionCompletion(
  completion: OSARProjectionCompletion,
): boolean {

  return (
    completion.status ===
      "PROJECTION_COMPLETION_RECORDED" &&
    completion.auditReference.length > 0 &&
    completion.reason.length > 0 &&
    completion.completedAt.length > 0 &&
    (
      completion.decision === "COMPLETED" ||
      completion.decision === "REVIEW" ||
      completion.decision === "FAILED"
    )
  );
}
