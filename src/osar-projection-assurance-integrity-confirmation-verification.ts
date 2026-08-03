/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerification Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerification defines the bounded
 * verification layer responsible for recording structural verification of an
 * integrity-confirmation checkpoint.
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
 * Integrity-confirmation verification representation only:
 * - preserves confirmation lineage
 * - records verification references
 * - maintains immutable checkpoints
 * - supports structural integrity verification review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmation,
  validateOSARProjectionAssuranceIntegrityConfirmation,
} from "./osar-projection-assurance-integrity-confirmation";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationDecision =
  | "VERIFIED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity confirmation verification artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerification {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationStatus;

  /**
   * Confirmation reference.
   */
  readonly confirmationReference:
    string;

  /**
   * Verification reference.
   */
  readonly verificationReference:
    string;

  /**
   * Ordered verification lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Verification decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationDecision;

  /**
   * Verification timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification artifact.
 *
 * Verification representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerification(input: {
  assuranceConfirmation:
    OSARProjectionAssuranceIntegrityConfirmation;

  verificationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityConfirmationVerification {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmation(
      input.assuranceConfirmation,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_RECORDED",

    confirmationReference:
      input.assuranceConfirmation.confirmationReference,

    verificationReference:
      input.verificationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceConfirmation.decision === "CONFIRMED" &&
      input.verificationReference.length > 0 &&
      input.lineage.length > 0
        ? "VERIFIED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerification(
  verification:
    OSARProjectionAssuranceIntegrityConfirmationVerification,
): boolean {

  return (
    verification.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_RECORDED" &&
    verification.confirmationReference.length > 0 &&
    verification.verificationReference.length > 0 &&
    verification.lineage.length > 0 &&
    verification.createdAt.length > 0 &&
    (
      verification.decision === "VERIFIED" ||
      verification.decision === "REVIEW" ||
      verification.decision === "INVALID"
    )
  );
}
