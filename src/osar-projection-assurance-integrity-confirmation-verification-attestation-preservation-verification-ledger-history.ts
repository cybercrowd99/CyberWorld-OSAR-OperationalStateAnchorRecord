/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory
 * defines the bounded historical layer responsible for preserving a closed
 * preservation-verification-ledger lineage following closure recording.
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
 * History representation only:
 * - preserves closure lineage
 * - records historical references
 * - maintains immutable ordering
 * - supports structural integrity continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-closure";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistoryStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_HISTORY_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistoryDecision =
  | "PRESERVED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistoryStatus;

  readonly closureReference:
    string;

  readonly historyReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistoryDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerHistory artifact.
 *
 * History representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory(
  input: {

    closure:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure;

    historyReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerClosure(
      input.closure,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_HISTORY_RECORDED",

    closureReference:
      input.closure.closureReference,

    historyReference:
      input.historyReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.closure.decision === "CLOSED" &&
      input.historyReference.length > 0 &&
      input.lineage.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),

  });

}

/**
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory(
  history:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory,
): boolean {

  return (

    history.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_HISTORY_RECORDED" &&

    history.closureReference.length > 0 &&

    history.historyReference.length > 0 &&

    history.lineage.length > 0 &&

    history.createdAt.length > 0 &&

    (
      history.decision === "PRESERVED" ||
      history.decision === "REVIEW"
    )

  );

}
