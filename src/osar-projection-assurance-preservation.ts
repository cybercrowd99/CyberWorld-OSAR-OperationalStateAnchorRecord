/**
 * CyberWorld-OSAR — OSARProjectionAssurancePreservation Artifact
 *
 * OSARProjectionAssurancePreservation defines the bounded preservation layer
 * responsible for confirming that an archived assurance chain remains
 * structurally preserved for historical continuity.
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
 * Preservation representation only:
 * - preserves archive lineage
 * - records preservation references
 * - maintains immutable checkpoints
 * - supports structural assurance integrity review
 */

import {
  OSARProjectionAssuranceArchive,
  validateOSARProjectionAssuranceArchive,
} from "./osar-projection-assurance-archive";

export type OSARProjectionAssurancePreservationStatus =
  | "PROJECTION_ASSURANCE_PRESERVATION_RECORDED";

export type OSARProjectionAssurancePreservationDecision =
  | "PRESERVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance preservation artifact.
 */
export interface OSARProjectionAssurancePreservation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssurancePreservationStatus;

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
   * Ordered preservation lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Preservation decision.
   */
  readonly decision:
    OSARProjectionAssurancePreservationDecision;

  /**
   * Preservation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance preservation artifact.
 *
 * Preservation representation only.
 */
export function createOSARProjectionAssurancePreservation(input: {
  assuranceArchive:
    OSARProjectionAssuranceArchive;

  preservationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssurancePreservation {

  const valid =
    validateOSARProjectionAssuranceArchive(
      input.assuranceArchive,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_PRESERVATION_RECORDED",

    archiveReference:
      input.assuranceArchive.archiveReference,

    preservationReference:
      input.preservationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceArchive.decision === "ARCHIVED" &&
      input.preservationReference.length > 0 &&
      input.lineage.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance preservation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssurancePreservation(
  preservation: OSARProjectionAssurancePreservation,
): boolean {

  return (
    preservation.status ===
      "PROJECTION_ASSURANCE_PRESERVATION_RECORDED" &&
    preservation.archiveReference.length > 0 &&
    preservation.preservationReference.length > 0 &&
    preservation.lineage.length > 0 &&
    preservation.createdAt.length > 0 &&
    (
      preservation.decision === "PRESERVED" ||
      preservation.decision === "REVIEW" ||
      preservation.decision === "INVALID"
    )
  );
}
