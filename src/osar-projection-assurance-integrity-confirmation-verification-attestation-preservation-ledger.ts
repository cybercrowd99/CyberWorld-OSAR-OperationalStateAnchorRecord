/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger
 * defines the bounded preservation-ledger layer responsible for recording
 * preservation-continuity lineage after preservation confirmation.
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
 * Preservation-ledger representation only:
 * - preserves preservation lineage
 * - records preservation-history references
 * - maintains immutable ordering
 * - supports structural integrity-continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedgerStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_LEDGER_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedgerDecision =
  | "RECORDED"
  | "REVIEW";

/**
 * Projection assurance integrity confirmation verification attestation preservation ledger artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedgerStatus;

  /**
   * Preservation reference.
   */
  readonly preservationReference:
    string;

  /**
   * Preservation ledger reference describing immutable ledger anchor.
   */
  readonly preservationLedgerReference:
    string;

  /**
   * Ordered preservation-ledger lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Preservation-ledger decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedgerDecision;

  /**
   * Ledger creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation preservation ledger artifact.
 *
 * Preservation-ledger representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger(
  input: {
    assurancePreservation:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation;

    preservationLedgerReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation(
      input.assurancePreservation,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_LEDGER_RECORDED",

    preservationReference:
      input.assurancePreservation.preservationReference,

    preservationLedgerReference:
      input.preservationLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assurancePreservation.decision === "PRESERVED" &&
      input.preservationLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation preservation ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger(
  ledger:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_LEDGER_RECORDED" &&
    ledger.preservationReference.length > 0 &&
    ledger.preservationLedgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "RECORDED" ||
      ledger.decision === "REVIEW"
    )
  );
}
