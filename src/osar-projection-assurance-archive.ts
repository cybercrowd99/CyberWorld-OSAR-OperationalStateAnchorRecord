/**
 * CyberWorld-OSAR — OSARProjectionAssuranceArchive Artifact
 *
 * OSARProjectionAssuranceArchive defines the bounded archival layer
 * responsible for preserving a completed assurance-history checkpoint for
 * historical reference.
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
 * - preserves assurance-history lineage
 * - records archive references
 * - maintains immutable ordering
 * - supports long-term structural assurance review
 */

import {
  OSARProjectionAssuranceHistory,
  validateOSARProjectionAssuranceHistory,
} from "./osar-projection-assurance-history";

export type OSARProjectionAssuranceArchiveStatus =
  | "PROJECTION_ASSURANCE_ARCHIVE_RECORDED";

export type OSARProjectionAssuranceArchiveDecision =
  | "ARCHIVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance archive artifact.
 */
export interface OSARProjectionAssuranceArchive {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceArchiveStatus;

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
   * Ordered archive lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Archive decision.
   */
  readonly decision:
    OSARProjectionAssuranceArchiveDecision;

  /**
   * Archive timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance archive artifact.
 *
 * Archive representation only.
 */
export function createOSARProjectionAssuranceArchive(input: {
  assuranceHistory:
    OSARProjectionAssuranceHistory;

  archiveReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceArchive {

  const valid =
    validateOSARProjectionAssuranceHistory(
      input.assuranceHistory,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_ARCHIVE_RECORDED",

    historyReference:
      input.assuranceHistory.historyReference,

    archiveReference:
      input.archiveReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceHistory.decision === "PRESERVED" &&
      input.archiveReference.length > 0 &&
      input.lineage.length > 0
        ? "ARCHIVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance archive structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceArchive(
  archive: OSARProjectionAssuranceArchive,
): boolean {

  return (
    archive.status ===
      "PROJECTION_ASSURANCE_ARCHIVE_RECORDED" &&
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
