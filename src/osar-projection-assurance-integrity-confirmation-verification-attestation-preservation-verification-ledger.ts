/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger
 * defines the bounded preservation-verification-ledger layer responsible for
 * recording verification-continuity lineage after preservation-verification
 * confirmation.
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
 * Preservation-verification-ledger representation only:
 * - preserves verification lineage
 * - records verification-ledger references
 * - maintains immutable ordering
 * - supports structural integrity-continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerDecision =
  | "RECORDED"
  | "REVIEW";

/**
 * Projection assurance integrity confirmation verification attestation
 * preservation verification ledger artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerStatus;

  /**
   * Preservation verification reference.
   */
  readonly preservationVerificationReference:
    string;

  /**
   * Verification ledger reference describing immutable ledger anchor.
   */
  readonly verificationLedgerReference:
    string;

  /**
   * Ordered verification-ledger lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Verification-ledger decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerDecision;

  /**
   * Ledger creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation
 * preservation verification ledger artifact.
 *
 * Preservation-verification-ledger representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger(
  input: {
    preservationVerification:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification;

    verificationLedgerReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerification(
      input.preservationVerification,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_RECORDED",

    preservationVerificationReference:
      input.preservationVerification.verificationReference,

    verificationLedgerReference:
      input.verificationLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.preservationVerification.decision === "VERIFIED" &&
      input.verificationLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation
 * preservation verification ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger(
  ledger:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_RECORDED" &&
    ledger.preservationVerificationReference.length > 0 &&
    ledger.verificationLedgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "RECORDED" ||
      ledger.decision === "REVIEW"
    )
  );
}
