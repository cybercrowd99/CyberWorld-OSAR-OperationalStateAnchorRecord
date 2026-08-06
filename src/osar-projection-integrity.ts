/**
 * CyberWorld-OSAR — OSARProjectionIntegrity Artifact
 * 
 * OSARProjectionIntegrity defines the bounded integrity
 * representation layer responsible for recording the structural
 * integrity condition of a preserved projection chain.
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
 * Integrity representation only:
 * - preserves preservation lineage
 * - records structural integrity condition
 * - maintains immutable references
 * - supports verification review
 */

import {
  OSARProjectionPreservation,
  validateOSARProjectionPreservation,
} from "./osar-projection-preservation";

export type OSARProjectionIntegrityStatus =
  | "PROJECTION_INTEGRITY_RECORDED";

export type OSARProjectionIntegrityDecision =
  | "VALID"
  | "REVIEW"
  | "INVALID";

/**
 * Projection integrity artifact.
 */
export interface OSARProjectionIntegrity {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionIntegrityStatus;

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
   * Integrity decision.
   */
  readonly decision:
    OSARProjectionIntegrityDecision;

  /**
   * Integrity timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection integrity artifact.
 *
 * Integrity representation only.
 */
export function createOSARProjectionIntegrity(input: {
  preservation:
    OSARProjectionPreservation;

  integrityReference:
    string;
}): OSARProjectionIntegrity {

  const valid =
    validateOSARProjectionPreservation(
      input.preservation,
    );

  return Object.freeze({
    status:
      "PROJECTION_INTEGRITY_RECORDED",

    preservationReference:
      input.preservation.preservationReference,

    integrityReference:
      input.integrityReference,

    decision:
      valid &&
      input.integrityReference.length > 0
        ? "VALID"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection integrity structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionIntegrity(
  integrity: OSARProjectionIntegrity,
): boolean {

  return (
    integrity.status ===
      "PROJECTION_INTEGRITY_RECORDED" &&
    integrity.preservationReference.length > 0 &&
    integrity.integrityReference.length > 0 &&
    integrity.createdAt.length > 0 &&
    (
      integrity.decision === "VALID" ||
      integrity.decision === "REVIEW" ||
      integrity.decision === "INVALID"
    )
  );
}
