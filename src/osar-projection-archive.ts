/**
 * CyberWorld-OSAR — OSARProjectionArchive Artifact
 * 
 * OSARProjectionArchive defines the bounded archive
 * representation layer responsible for preserving a completed
 * projection continuity chain for historical reference.
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
 * Archive representation only:
 * - preserves continuity lineage
 * - records completed projection history
 * - maintains immutable references
 * - supports historical verification
 */

import {
  OSARProjectionContinuity,
  validateOSARProjectionContinuity,
} from "./osar-projection-continuity";

export type OSARProjectionArchiveStatus =
  | "PROJECTION_ARCHIVE_RECORDED";

export type OSARProjectionArchiveDecision =
  | "ARCHIVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection archive artifact.
 */
export interface OSARProjectionArchive {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionArchiveStatus;

  /**
   * Continuity reference.
   */
  readonly continuityReference:
    string;

  /**
   * Archive reference.
   */
  readonly archiveReference:
    string;

  /**
   * Archive decision.
   */
  readonly decision:
    OSARProjectionArchiveDecision;

  /**
   * Archive timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection archive artifact.
 *
 * Archive representation only.
 */
export function createOSARProjectionArchive(input: {
  continuity:
    OSARProjectionContinuity;

  archiveReference:
    string;
}): OSARProjectionArchive {

  const valid =
    validateOSARProjectionContinuity(
      input.continuity,
    );

  return Object.freeze({
    status:
      "PROJECTION_ARCHIVE_RECORDED",

    continuityReference:
      input.continuity.continuityReference,

    archiveReference:
      input.archiveReference,

    decision:
      valid &&
      input.archiveReference.length > 0
        ? "ARCHIVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection archive structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionArchive(
  archive: OSARProjectionArchive,
): boolean {

  return (
    archive.status ===
      "PROJECTION_ARCHIVE_RECORDED" &&
    archive.continuityReference.length > 0 &&
    archive.archiveReference.length > 0 &&
    archive.createdAt.length > 0 &&
    (
      archive.decision === "ARCHIVED" ||
      archive.decision === "REVIEW" ||
      archive.decision === "INVALID"
    )
  );
}
