/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation defines the
 * bounded attestation layer responsible for recording that an integrity-confirmation
 * verification checkpoint has satisfied structural attestation requirements.
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
 * Integrity-confirmation-verification attestation representation only:
 * - preserves verification lineage
 * - records attestation references
 * - maintains immutable checkpoints
 * - supports structural integrity continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerification,
  validateOSARProjectionAssuranceIntegrityConfirmationVerification,
} from "./osar-projection-assurance-integrity-confirmation-verification";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationDecision =
  | "ATTESTED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity confirmation verification attestation artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationStatus;

  /**
   * Verification reference.
   */
  readonly verificationReference:
    string;

  /**
   * Attestation reference.
   */
  readonly attestationReference:
    string;

  /**
   * Ordered attestation lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Attestation decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationDecision;

  /**
   * Attestation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation artifact.
 *
 * Attestation representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestation(
  input: {
    assuranceVerification:
      OSARProjectionAssuranceIntegrityConfirmationVerification;

    attestationReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerification(
      input.assuranceVerification,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_RECORDED",

    verificationReference:
      input.assuranceVerification.verificationReference,

    attestationReference:
      input.attestationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceVerification.decision === "VERIFIED" &&
      input.attestationReference.length > 0 &&
      input.lineage.length > 0
        ? "ATTESTED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestation(
  attestation:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation,
): boolean {

  return (
    attestation.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_RECORDED" &&
    attestation.verificationReference.length > 0 &&
    attestation.attestationReference.length > 0 &&
    attestation.lineage.length > 0 &&
    attestation.createdAt.length > 0 &&
    (
      attestation.decision === "ATTESTED" ||
      attestation.decision === "REVIEW" ||
      attestation.decision === "INVALID"
    )
  );
}
