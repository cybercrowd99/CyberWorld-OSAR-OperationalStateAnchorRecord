/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrity Artifact
 * 
 * OSARProjectionAssuranceIntegrity defines the bounded integrity layer
 * responsible for recording the structural integrity condition of a preserved
 * assurance chain after preservation confirmation.
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
 * Integrity representation only:
 * - preserves preservation lineage
 * - records integrity references
 * - maintains immutable checkpoints
 * - supports structural assurance verification
 */

import {
  OSARProjectionAssurancePreservation,
  validateOSARProjectionAssurancePreservation,
} from "./osar-projection-assurance-preservation";

export type OSARProjectionAssuranceIntegrityStatus =
  | "PROJECTION_ASSURANCE_INTEGRITY_RECORDED";

export type OSARProjectionAssuranceIntegrityDecision =
  | "VALID"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity artifact.
 */
export interface OSARProjectionAssuranceIntegrity {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityStatus;

  /**
   * Preservation reference.
   */
  readonly preservationReference:
    string;

  /**
   * Integrity reference.
   */
  readonly integrityReference:
    string;

  /**
   * Ordered integrity lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Integrity decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityDecision;

  /**
   * Integrity timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity artifact.
 *
 * Integrity representation only.
 */
export function createOSARProjectionAssuranceIntegrity(input: {
  assurancePreservation:
    OSARProjectionAssurancePreservation;

  integrityReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrity {

  const valid =
    validateOSARProjectionAssurancePreservation(
      input.assurancePreservation,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_RECORDED",

    preservationReference:
      input.assurancePreservation.preservationReference,

    integrityReference:
      input.integrityReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assurancePreservation.decision === "PRESERVED" &&
      input.integrityReference.length > 0 &&
      input.lineage.length > 0
        ? "VALID"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrity(
  integrity: OSARProjectionAssuranceIntegrity,
): boolean {

  return (
    integrity.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_RECORDED" &&
    integrity.preservationReference.length > 0 &&
    integrity.integrityReference.length > 0 &&
    integrity.lineage.length > 0 &&
    integrity.createdAt.length > 0 &&
    (
      integrity.decision === "VALID" ||
      integrity.decision === "REVIEW" ||
      integrity.decision === "INVALID"
    )
  );
}
