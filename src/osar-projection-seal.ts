/**
 * CyberWorld-OSAR — OSARProjectionSeal Artifact
 *
 * OSARProjectionSeal defines the bounded sealing layer
 * responsible for recording that a projection verification path
 * has reached a preserved structural checkpoint.
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
 * Seal representation only:
 * - preserves verification lineage
 * - records sealed projection condition
 * - maintains immutable references
 * - supports final structural checkpoint review
 */

import {
  OSARProjectionVerification,
  validateOSARProjectionVerification,
} from "./osar-projection-verification";

export type OSARProjectionSealStatus =
  | "PROJECTION_SEAL_RECORDED";

export type OSARProjectionSealDecision =
  | "SEALED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection seal artifact.
 */
export interface OSARProjectionSeal {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionSealStatus;

  /**
   * Verification reference.
   */
  readonly verificationReference:
    string;

  /**
   * Seal reference.
   */
  readonly sealReference:
    string;

  /**
   * Seal decision.
   */
  readonly decision:
    OSARProjectionSealDecision;

  /**
   * Seal timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection seal artifact.
 *
 * Seal representation only.
 */
export function createOSARProjectionSeal(input: {
  verification:
    OSARProjectionVerification;

  sealReference:
    string;
}): OSARProjectionSeal {

  const valid =
    validateOSARProjectionVerification(
      input.verification,
    );

  return Object.freeze({
    status:
      "PROJECTION_SEAL_RECORDED",

    verificationReference:
      input.verification.verificationReference,

    sealReference:
      input.sealReference,

    decision:
      valid &&
      input.verification.decision === "VERIFIED" &&
      input.sealReference.length > 0
        ? "SEALED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection seal structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionSeal(
  seal: OSARProjectionSeal,
): boolean {

  return (
    seal.status ===
      "PROJECTION_SEAL_RECORDED" &&
    seal.verificationReference.length > 0 &&
    seal.sealReference.length > 0 &&
    seal.createdAt.length > 0 &&
    (
      seal.decision === "SEALED" ||
      seal.decision === "REVIEW" ||
      seal.decision === "INVALID"
    )
  );
}
