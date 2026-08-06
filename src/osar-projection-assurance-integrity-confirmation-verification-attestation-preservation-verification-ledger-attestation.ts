/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation
 * defines the bounded attestation layer responsible for recording the structural
 * attestation of a verified PreservationVerificationLedger checkpoint.
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
 * Attestation representation only:
 * - preserves verification lineage
 * - records attestation references
 * - maintains immutable checkpoints
 * - supports structural integrity continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-verification";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_ATTESTATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestationDecision =
  | "ATTESTED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestationStatus;

  readonly verificationReference:
    string;

  readonly attestationReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestationDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerAttestation artifact.
 *
 * Attestation representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation(
  input: {

    verification:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification;

    attestationReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification(
      input.verification,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_ATTESTATION_RECORDED",

    verificationReference:
      input.verification.verificationReference,

    attestationReference:
      input.attestationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.verification.decision === "VERIFIED" &&
      input.attestationReference.length > 0 &&
      input.lineage.length > 0
        ? "ATTESTED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),

  });

}

/**
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation(
  attestation:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation,
): boolean {

  return (

    attestation.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_ATTESTATION_RECORDED" &&

    attestation.verificationReference.length > 0 &&

    attestation.attestationReference.length > 0 &&

    attestation.lineage.length > 0 &&

    attestation.createdAt.length > 0 &&

    (
      attestation.decision === "ATTESTED" ||
      attestation.decision === "REVIEW"
    )

  );

}
