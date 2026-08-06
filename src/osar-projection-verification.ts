/**
 * CyberWorld-OSAR — OSARProjectionVerification Artifact
 * 
 * OSARProjectionVerification defines the bounded verification
 * representation layer responsible for recording verification
 * of a structurally preserved projection integrity condition.
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
 * Verification representation only:
 * - preserves integrity lineage
 * - records verification condition
 * - maintains immutable references
 * - supports structural verification review
 */

import {
  OSARProjectionIntegrity,
  validateOSARProjectionIntegrity,
} from "./osar-projection-integrity";

export type OSARProjectionVerificationStatus =
  | "PROJECTION_VERIFICATION_RECORDED";

export type OSARProjectionVerificationDecision =
  | "VERIFIED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection verification artifact.
 */
export interface OSARProjectionVerification {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionVerificationStatus;

  /**
   * Integrity reference.
   */
  readonly integrityReference:
    string;

  /**
   * Verification reference.
   */
  readonly verificationReference:
    string;

  /**
   * Verification decision.
   */
  readonly decision:
    OSARProjectionVerificationDecision;

  /**
   * Verification timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection verification artifact.
 *
 * Verification representation only.
 */
export function createOSARProjectionVerification(input: {
  integrity:
    OSARProjectionIntegrity;

  verificationReference:
    string;
}): OSARProjectionVerification {

  const valid =
    validateOSARProjectionIntegrity(
      input.integrity,
    );

  return Object.freeze({
    status:
      "PROJECTION_VERIFICATION_RECORDED",

    integrityReference:
      input.integrity.integrityReference,

    verificationReference:
      input.verificationReference,

    decision:
      valid &&
      input.verificationReference.length > 0 &&
      input.integrity.decision === "VALID"
        ? "VERIFIED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection verification structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionVerification(
  verification: OSARProjectionVerification,
): boolean {

  return (
    verification.status ===
      "PROJECTION_VERIFICATION_RECORDED" &&
    verification.integrityReference.length > 0 &&
    verification.verificationReference.length > 0 &&
    verification.createdAt.length > 0 &&
    (
      verification.decision === "VERIFIED" ||
      verification.decision === "REVIEW" ||
      verification.decision === "INVALID"
    )
  );
}
