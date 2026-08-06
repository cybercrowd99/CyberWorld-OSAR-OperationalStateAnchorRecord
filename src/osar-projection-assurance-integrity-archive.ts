/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityArchive Artifact
 * 
 * OSARProjectionAssuranceIntegrityArchive defines the bounded archival layer
 * responsible for preserving a completed integrity-history checkpoint for
 * long-term structural reference.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 * - expand visibility
 * - mutate OSAR artifacts
 * - modify world state
 * - create financial-ledger semantics
 *
 * Archive representation only:
 * - preserves integrity-history lineage
 * - records archive references
 * - maintains immutable ordering
 * - supports long-term structural integrity review
 */

import {
  OSARProjectionAssuranceIntegrityHistory,
  validateOSARProjectionAssuranceIntegrityHistory,
} from "./osar-projection-assurance-integrity-history";

export type OSARProjectionAssuranceIntegrityArchiveStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_ARCHIVE_RECORDED";

export type OSARProjectionAssuranceIntegrityArchiveDecision =
  | "ARCHIVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity archive artifact.
 */
export interface OSARProjectionAssuranceIntegrityArchive {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityArchiveStatus;

  /**
   * History reference.
   */
  readonly historyReference:
    string;

  /**
   * Archive reference.
   */
  readonly archiveReference:
    string;

  /**
   * Ordered archival lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Archive decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityArchiveDecision;

  /**
   * Archive timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity archive artifact.
 *
 * Archive representation only.
 */
export function createOSARProjectionAssuranceIntegrityArchive(input: {
  integrityHistory:
    OSARProjectionAssuranceIntegrityHistory;

  archiveReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityArchive {

  const valid =
    validateOSARProjectionAssuranceIntegrityHistory(
      input.integrityHistory,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_ARCHIVE_RECORDED",

    historyReference:
      input.integrityHistory.historyReference,

    archiveReference:
      input.archiveReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.integrityHistory.decision === "PRESERVED" &&
      input.archiveReference.length > 0 &&
      input.lineage.length > 0
        ? "ARCHIVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity archive structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityArchive(
  archive:
    OSARProjectionAssuranceIntegrityArchive,
): boolean {

  return (
    archive.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_ARCHIVE_RECORDED" &&
    archive.historyReference.length > 0 &&
    archive.archiveReference.length > 0 &&
    archive.lineage.length > 0 &&
    archive.createdAt.length > 0 &&
    (
      archive.decision === "ARCHIVED" ||
      archive.decision === "REVIEW" ||
      archive.decision === "INVALID"
    )
  );
}
