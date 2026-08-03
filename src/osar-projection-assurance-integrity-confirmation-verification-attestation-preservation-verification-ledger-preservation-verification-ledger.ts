/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedger Artifact
 *
 * This artifact defines the bounded preservation-verification-ledger verification
 * checkpoint layer.
 *
 * It exists to record structural continuity verification of a preserved
 * integrity-verification ledger checkpoint.
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
 * - create permanent surveillance history
 *
 * Preservation-verification-ledger representation only:
 * - preserves checkpoint lineage reference
 * - records verification-ledger confirmation state
 * - maintains immutable checkpoint ordering
 * - supports structural integrity review
 *
 * This layer is bounded and intended to transition into
 * temporal lifecycle control.
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-preservation-verification";


export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedgerStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_VERIFICATION_LEDGER_RECORDED";


export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedgerDecision =
  | "VERIFIED"
  | "REVIEW";


export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedger {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedgerStatus;

  /**
   * Source preservation-verification reference.
   */
  readonly preservationVerificationReference:
    string;

  /**
   * Immutable preservation-verification-ledger anchor.
   */
  readonly preservationVerificationLedgerReference:
    string;

  /**
   * Ordered lineage checkpoint references.
   */
  readonly lineage:
    readonly string[];

  /**
   * Structural verification outcome.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedgerDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}


/**
 * Create bounded preservation-verification-ledger verification artifact.
 *
 * Structural representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedger(
  input: {

    preservationVerification:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification;

    preservationVerificationLedgerReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedger {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerification(
      input.preservationVerification,
    );


  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_VERIFICATION_LEDGER_RECORDED",


    preservationVerificationReference:
      input.preservationVerification.verificationReference,


    preservationVerificationLedgerReference:
      input.preservationVerificationLedgerReference,


    lineage:
      Object.freeze([
        ...input.lineage,
      ]),


    decision:
      valid &&
      input.preservationVerification.decision === "VERIFIED" &&
      input.preservationVerificationLedgerReference.length > 0 &&
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
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedger(
  artifact:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationVerificationLedger,
): boolean {

  return (

    artifact.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_VERIFICATION_LEDGER_RECORDED" &&

    artifact.preservationVerificationReference.length > 0 &&

    artifact.preservationVerificationLedgerReference.length > 0 &&

    artifact.lineage.length > 0 &&

    artifact.createdAt.length > 0 &&

    (
      artifact.decision === "VERIFIED" ||
      artifact.decision === "REVIEW"
    )

  );

}
