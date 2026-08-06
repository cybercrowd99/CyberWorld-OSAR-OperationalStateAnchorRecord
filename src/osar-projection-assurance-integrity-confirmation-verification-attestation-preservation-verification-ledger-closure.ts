/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure
 * defines the bounded closure layer responsible for recording the historical
 * closure condition of a finalized preservation-verification-ledger attestation
 * checkpoint.
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
 * Closure representation only:
 * - preserves finalization lineage
 * - records closure references
 * - maintains immutable checkpoints
 * - supports structural integrity continuity closure review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-finalization";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosureStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_CLOSURE_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosureDecision =
  | "CLOSED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosureStatus;

  readonly finalizationReference:
    string;

  readonly closureReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosureDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerClosure artifact.
 *
 * Closure representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure(
  input: {

    finalization:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization;

    closureReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerFinalization(
      input.finalization,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_CLOSURE_RECORDED",

    finalizationReference:
      input.finalization.finalizationReference,

    closureReference:
      input.closureReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.finalization.decision === "FINALIZED" &&
      input.closureReference.length > 0 &&
      input.lineage.length > 0
        ? "CLOSED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),

  });

}

/**
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure(
  closure:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure,
): boolean {

  return (

    closure.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_CLOSURE_RECORDED" &&

    closure.finalizationReference.length > 0 &&

    closure.closureReference.length > 0 &&

    closure.lineage.length > 0 &&

    closure.createdAt.length > 0 &&

    (
      closure.decision === "CLOSED" ||
      closure.decision === "REVIEW"
    )

  );

}
