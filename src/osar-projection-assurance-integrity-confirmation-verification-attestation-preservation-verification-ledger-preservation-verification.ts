/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification
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
 * - supports structural integrity continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-preservation-ledger";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_VERIFICATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationDecision =
  | "VERIFIED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationStatus;

  readonly preservationLedgerReference:
    string;

  readonly verificationReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerPreservationVerification artifact.
 *
 * Preservation-verification representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification(
  input: {

    preservationLedger:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger;

    verificationReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger(
      input.preservationLedger,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_VERIFICATION_RECORDED",

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
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification(
  verification:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification,
): boolean {

  return (

    verification.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_VERIFICATION_RECORDED" &&

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
