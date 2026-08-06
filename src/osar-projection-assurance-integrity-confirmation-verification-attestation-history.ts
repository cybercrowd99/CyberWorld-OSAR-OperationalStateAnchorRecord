/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory
 * defines the bounded historical layer responsible for preserving a closed
 * integrity-confirmation-verification-attestation lineage following closure
 * recording.
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
 * - supports structural integrity-continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationClosure,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationClosure,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-closure";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistoryStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_HISTORY_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistoryDecision =
  | "PRESERVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity confirmation verification attestation history artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistoryStatus;

  readonly closureReference:
    string;

  readonly historyReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistoryDecision;

  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation history artifact.
 *
 * History representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory(
  input: {
    assuranceClosure:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationClosure;

    historyReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationClosure(
      input.assuranceClosure,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_HISTORY_RECORDED",

    closureReference:
      input.assuranceClosure.closureReference,

    historyReference:
      input.historyReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceClosure.decision === "CLOSED" &&
      input.historyReference.length > 0 &&
      input.lineage.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation history structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory(
  history:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory,
): boolean {

  return (
    history.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_HISTORY_RECORDED" &&

    history.closureReference.length > 0 &&

    history.historyReference.length > 0 &&

    history.lineage.length > 0 &&

    history.createdAt.length > 0 &&

    (
      history.decision === "PRESERVED" ||
      history.decision === "REVIEW" ||
      history.decision === "INVALID"
    )
  );
}
