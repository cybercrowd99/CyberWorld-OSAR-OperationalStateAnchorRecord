/**
 * CyberWorld-OSAR — OSARAuditRecord Artifact
 * 
 * OSARAuditRecord defines the bounded audit-reference layer
 * responsible for preserving verification history of OSAR
 * structural operations.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - become a ledger authority
 * - authorize transactions
 * - interpret behavior
 * - modify artifacts
 * - modify world state
 *
 * Audit recording only:
 * - preserves verification references
 * - records structural outcomes
 * - supports review history
 * - maintains non-interpretive traceability
 */

import {
  OSARIntegrityReport,
  validateOSARIntegrityReport,
} from "./osar-integrity-report";

export type OSARAuditRecordStatus =
  | "AUDIT_RECORDED";

export type OSARAuditDecision =
  | "RECORDED"
  | "REVIEW"
  | "INVALID";

/**
 * Audit record artifact.
 */
export interface OSARAuditRecord {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARAuditRecordStatus;

  /**
   * Integrity report reference.
   */
  readonly integrityReference:
    string;

  /**
   * Audit decision.
   */
  readonly decision:
    OSARAuditDecision;

  /**
   * Audit event description.
   */
  readonly auditEvent:
    string;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create audit record.
 *
 * Structural audit recording only.
 */
export function createOSARAuditRecord(input: {
  integrityReport:
    OSARIntegrityReport;

  auditEvent:
    string;
}): OSARAuditRecord {

  const decision: OSARAuditDecision =
    validateOSARIntegrityReport(
      input.integrityReport,
    )
      ? "RECORDED"
      : "REVIEW";

  return Object.freeze({
    status:
      "AUDIT_RECORDED",

    integrityReference:
      input.integrityReport.continuityReference,

    decision,

    auditEvent:
      input.auditEvent,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate audit record structure.
 *
 * Structural validation only.
 */
export function validateOSARAuditRecord(
  record: OSARAuditRecord,
): boolean {

  return (
    record.status ===
      "AUDIT_RECORDED" &&
    record.integrityReference.length > 0 &&
    record.auditEvent.length > 0 &&
    record.createdAt.length > 0 &&
    (
      record.decision === "RECORDED" ||
      record.decision === "REVIEW" ||
      record.decision === "INVALID"
    )
  );
}
