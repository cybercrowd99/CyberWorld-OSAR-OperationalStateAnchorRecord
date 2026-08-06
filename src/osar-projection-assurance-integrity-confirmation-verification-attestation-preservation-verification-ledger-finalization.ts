/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization
 * defines the bounded finalization layer responsible for recording closure of an
 * attested preservation-verification-ledger checkpoint.
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
 * Finalization representation only:
 * - preserves attestation lineage
 * - records finalization references
 * - maintains immutable checkpoints
 * - supports structural integrity continuity closure
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-attestation";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalizationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_FINALIZATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalizationDecision =
  | "FINALIZED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalizationStatus;

  readonly attestationReference:
    string;

  readonly finalizationReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalizationDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerFinalization artifact.
 *
 * Finalization representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization(
  input: {

    attestation:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation;

    finalizationReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerAttestation(
      input.attestation,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_FINALIZATION_RECORDED",

    attestationReference:
      input.attestation.attestationReference,

    finalizationReference:
      input.finalizationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.attestation.decision === "ATTESTED" &&
      input.finalizationReference.length > 0 &&
      input.lineage.length > 0
        ? "FINALIZED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),

  });

}

/**
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization(
  finalization:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization,
): boolean {

  return (

    finalization.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_FINALIZATION_RECORDED" &&

    finalization.attestationReference.length > 0 &&

    finalization.finalizationReference.length > 0 &&

    finalization.lineage.length > 0 &&

    finalization.createdAt.length > 0 &&

    (
      finalization.decision === "FINALIZED" ||
      finalization.decision === "REVIEW"
    )

  );

}
