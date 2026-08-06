/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger
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
 * - records preservation-ledger references
 * - maintains immutable ordering
 * - supports structural integrity continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-preservation";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedgerStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_LEDGER_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedgerDecision =
  | "RECORDED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedgerStatus;

  readonly preservationReference:
    string;

  readonly preservationLedgerReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedgerDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerPreservationLedger artifact.
 *
 * Preservation-ledger representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger(
  input: {

    preservation:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation;

    preservationLedgerReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation(
      input.preservation,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_LEDGER_RECORDED",

    preservationReference:
      input.preservation.preservationReference,

    preservationLedgerReference:
      input.preservationLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.preservation.decision === "PRESERVED" &&
      input.preservationLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),

  });

}

/**
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger(
  preservationLedger:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationLedger,
): boolean {

  return (

    preservationLedger.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_LEDGER_RECORDED" &&

    preservationLedger.preservationReference.length > 0 &&

    preservationLedger.preservationLedgerReference.length > 0 &&

    preservationLedger.lineage.length > 0 &&

    preservationLedger.createdAt.length > 0 &&

    (
      preservationLedger.decision === "RECORDED" ||
      preservationLedger.decision === "REVIEW"
    )

  );

}
