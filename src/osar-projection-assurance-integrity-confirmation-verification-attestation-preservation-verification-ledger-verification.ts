/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification
 * defines the bounded verification layer responsible for structurally verifying
 * a PreservationVerificationLedger checkpoint.
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
 * Verification representation only:
 * - preserves ledger lineage
 * - records verification references
 * - maintains immutable checkpoints
 * - supports structural integrity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerificationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_VERIFICATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerificationDecision =
  | "VERIFIED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerificationStatus;

  readonly preservationVerificationLedgerReference:
    string;

  readonly verificationReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerificationDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerVerification artifact.
 *
 * Verification representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification(
  input: {

    preservationVerificationLedger:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger;

    verificationReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger(
      input.preservationVerificationLedger,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_VERIFICATION_RECORDED",

    preservationVerificationLedgerReference:
      input.preservationVerificationLedger.verificationLedgerReference,

    verificationReference:
      input.verificationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.preservationVerificationLedger.decision === "RECORDED" &&
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
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification(
  verification:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerVerification,
): boolean {

  return (

    verification.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_VERIFICATION_RECORDED" &&

    verification.preservationVerificationLedgerReference.length > 0 &&

    verification.verificationReference.length > 0 &&

    verification.lineage.length > 0 &&

    verification.createdAt.length > 0 &&

    (
      verification.decision === "VERIFIED" ||
      verification.decision === "REVIEW"
    )

  );

}
