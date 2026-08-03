/**
 * CyberWorld-OSAR — OSARProjectionAuditTrail Artifact
 *
 * OSARProjectionAuditTrail defines the bounded audit layer
 * responsible for preserving verification history of a
 * controlled projection trace.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize access
 * - expand visibility
 * - interpret behavior
 * - modify OSAR artifacts
 * - modify world state
 *
 * Audit representation only:
 * - preserves projection trace lineage
 * - records structural verification history
 * - maintains boundary continuity
 * - supports non-interpretive auditing
 */

import {
  OSARProjectionTrace,
  validateOSARProjectionTrace,
} from "./osar-projection-trace";

export type OSARProjectionAuditTrailStatus =
  | "PROJECTION_AUDIT_RECORDED";

export type OSARProjectionAuditDecision =
  | "RECORDED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection audit trail artifact.
 */
export interface OSARProjectionAuditTrail {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAuditTrailStatus;

  /**
   * Projection trace reference.
   */
  readonly traceReference:
    string;

  /**
   * Audit event description.
   */
  readonly auditEvent:
    string;

  /**
   * Audit decision.
   */
  readonly decision:
    OSARProjectionAuditDecision;

  /**
   * Audit timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection audit trail artifact.
 *
 * Audit recording only.
 */
export function createOSARProjectionAuditTrail(input: {
  trace:
    OSARProjectionTrace;

  auditEvent:
    string;
}): OSARProjectionAuditTrail {

  const valid =
    validateOSARProjectionTrace(
      input.trace,
    );

  return Object.freeze({
    status:
      "PROJECTION_AUDIT_RECORDED",

    traceReference:
      input.trace.projectionReference,

    auditEvent:
      input.auditEvent,

    decision:
      valid &&
      input.auditEvent.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection audit trail structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAuditTrail(
  audit: OSARProjectionAuditTrail,
): boolean {

  return (
    audit.status ===
      "PROJECTION_AUDIT_RECORDED" &&
    audit.traceReference.length > 0 &&
    audit.auditEvent.length > 0 &&
    audit.createdAt.length > 0 &&
    (
      audit.decision === "RECORDED" ||
      audit.decision === "REVIEW" ||
      audit.decision === "INVALID"
    )
  );
}
