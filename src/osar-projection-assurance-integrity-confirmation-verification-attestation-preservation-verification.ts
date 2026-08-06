/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification
 * defines the bounded preservation-verification layer responsible for recording
 * structural verification of a preservation-ledger checkpoint.
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
 * Preservation-verification representation only:
 * - preserves preservation-ledger lineage
 * - records verification references
 * - maintains immutable checkpoints
 * - supports structural integrity-continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-ledger";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationDecision =
  | "VERIFIED"
  | "REVIEW";

/**
 * Projection assurance integrity confirmation verification attestation preservation verification artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationStatus;

  /**
   * Preservation-ledger reference.
   */
  readonly preservationLedgerReference:
    string;

  /**
   * Verification reference describing immutable verification anchor.
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
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationDecision;

  /**
   * Verification creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation preservation verification artifact.
 *
 * Preservation-verification representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification(
  input: {
    preservationLedger:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger;

    verificationReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger(
      input.preservationLedger,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_RECORDED",

    preservationLedgerReference:
      input.preservationLedger.preservationLedgerReference,

    verificationReference:
      input.verificationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.preservationLedger.decision === "RECORDED" &&
      input.verificationReference.length > 0 &&
      input.lineage.length > 0
        ? "VERIFIED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation preservation verification structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification(
  verification:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification,
): boolean {

  return (
    verification.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_RECORDED" &&
    verification.preservationLedgerReference.length > 0 &&
    verification.verificationReference.length > 0 &&
    verification.lineage.length > 0 &&
    verification.createdAt.length > 0 &&
    (
      verification.decision === "VERIFIED" ||
      verification.decision === "REVIEW"
    )
  );
}
