/**
 * CyberWorld-OSAR — OSARProjectionPreservation Artifact
 *
 * OSARProjectionPreservation defines the bounded preservation
 * representation layer responsible for confirming that an
 * archived projection chain remains structurally preserved.
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
 * Preservation representation only:
 * - preserves archive lineage
 * - records preservation condition
 * - maintains immutable references
 * - supports historical integrity review
 */

import {
  OSARProjectionArchive,
  validateOSARProjectionArchive,
} from "./osar-projection-archive";

export type OSARProjectionPreservationStatus =
  | "PROJECTION_PRESERVATION_RECORDED";

export type OSARProjectionPreservationDecision =
  | "PRESERVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection preservation artifact.
 */
export interface OSARProjectionPreservation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionPreservationStatus;

  /**
   * Archive reference.
   */
  readonly archiveReference:
    string;

  /**
   * Preservation reference.
   */
  readonly preservationReference:
    string;

  /**
   * Preservation decision.
   */
  readonly decision:
    OSARProjectionPreservationDecision;

  /**
   * Preservation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection preservation artifact.
 *
 * Preservation representation only.
 */
export function createOSARProjectionPreservation(input: {
  archive:
    OSARProjectionArchive;

  preservationReference:
    string;
}): OSARProjectionPreservation {

  const valid =
    validateOSARProjectionArchive(
      input.archive,
    );

  return Object.freeze({
    status:
      "PROJECTION_PRESERVATION_RECORDED",

    archiveReference:
      input.archive.archiveReference,

    preservationReference:
      input.preservationReference,

    decision:
      valid &&
      input.preservationReference.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection preservation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionPreservation(
  preservation: OSARProjectionPreservation,
): boolean {

  return (
    preservation.status ===
      "PROJECTION_PRESERVATION_RECORDED" &&
    preservation.archiveReference.length > 0 &&
    preservation.preservationReference.length > 0 &&
    preservation.createdAt.length > 0 &&
    (
      preservation.decision === "PRESERVED" ||
      preservation.decision === "REVIEW" ||
      preservation.decision === "INVALID"
    )
  );
}
