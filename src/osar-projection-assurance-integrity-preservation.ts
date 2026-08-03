/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityPreservation Artifact
 *
 * OSARProjectionAssuranceIntegrityPreservation defines the bounded preservation
 * layer responsible for confirming that an archived integrity-continuity chain
 * remains structurally preserved for historical verification.
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
 * - supports structural integrity continuity
 */

import {
  OSARProjectionAssuranceIntegrityArchive,
  validateOSARProjectionAssuranceIntegrityArchive,
} from "./osar-projection-assurance-integrity-archive";

export type OSARProjectionAssuranceIntegrityPreservationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_PRESERVATION_RECORDED";

export type OSARProjectionAssuranceIntegrityPreservationDecision =
  | "PRESERVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity preservation artifact.
 */
export interface OSARProjectionAssuranceIntegrityPreservation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityPreservationStatus;

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
    OSARProjectionAssuranceIntegrityPreservationDecision;

  /**
   * Preservation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity preservation artifact.
 *
 * Preservation representation only.
 */
export function createOSARProjectionAssuranceIntegrityPreservation(input: {
  integrityArchive:
    OSARProjectionAssuranceIntegrityArchive;

  preservationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityPreservation {

  const valid =
    validateOSARProjectionAssuranceIntegrityArchive(
      input.integrityArchive,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_PRESERVATION_RECORDED",

    archiveReference:
      input.integrityArchive.archiveReference,

    preservationReference:
      input.preservationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.integrityArchive.decision === "ARCHIVED" &&
      input.preservationReference.length > 0 &&
      input.lineage.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity preservation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityPreservation(
  preservation:
    OSARProjectionAssuranceIntegrityPreservation,
): boolean {

  return (
    preservation.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_PRESERVATION_RECORDED" &&
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
