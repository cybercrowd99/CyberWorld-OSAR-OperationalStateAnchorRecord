/**
 * CyberWorld-OSAR — OSARIntegrityReport Artifact
 *
 * OSARIntegrityReport defines the bounded verification summary
 * layer responsible for representing the structural condition
 * of an OSAR continuity chain.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - become a ledger authority
 * - authorize transactions
 * - modify artifacts
 * - modify world state
 *
 * Integrity reporting only:
 * - summarizes validation condition
 * - preserves continuity reference
 * - supports audit review
 * - identifies structural issues
 */

import {
  OSARContinuityLedger,
  validateOSARContinuityLedger,
} from "./osar-continuity-ledger";

export type OSARIntegrityReportStatus =
  | "INTEGRITY_REPORTED";

export type OSARIntegrityDecision =
  | "PASS"
  | "REVIEW"
  | "FAIL";

/**
 * Integrity report artifact.
 */
export interface OSARIntegrityReport {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARIntegrityReportStatus;

  /**
   * Continuity reference.
   */
  readonly continuityReference:
    string;

  /**
   * Integrity decision.
   */
  readonly decision:
    OSARIntegrityDecision;

  /**
   * Structural findings.
   */
  readonly findings:
    readonly string[];

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create integrity report.
 *
 * Verification summary only.
 */
export function createOSARIntegrityReport(input: {
  continuityLedger:
    OSARContinuityLedger;

  findings?: readonly string[];
}): OSARIntegrityReport {

  const valid =
    validateOSARContinuityLedger(
      input.continuityLedger,
    );

  return Object.freeze({
    status:
      "INTEGRITY_REPORTED",

    continuityReference:
      input.continuityLedger.registryReference,

    decision:
      valid
        ? "PASS"
        : "REVIEW",

    findings:
      Object.freeze([
        ...(input.findings ?? []),
      ]),

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate integrity report structure.
 *
 * Structural validation only.
 */
export function validateOSARIntegrityReport(
  report: OSARIntegrityReport,
): boolean {

  return (
    report.status ===
      "INTEGRITY_REPORTED" &&
    report.continuityReference.length > 0 &&
    report.createdAt.length > 0 &&
    Array.isArray(report.findings) &&
    (
      report.decision === "PASS" ||
      report.decision === "REVIEW" ||
      report.decision === "FAIL"
    )
  );
}
