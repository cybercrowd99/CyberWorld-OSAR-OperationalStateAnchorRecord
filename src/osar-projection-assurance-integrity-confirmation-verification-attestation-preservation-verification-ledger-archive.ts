/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive
 * defines the bounded archival layer responsible for preserving a completed
 * preservation-verification-ledger-history checkpoint for long-term structural
 * reference.
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
 * Archive representation only:
 * - preserves history lineage
 * - records archive references
 * - maintains immutable ordering
 * - supports long-term structural integrity continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-history";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchiveStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_ARCHIVE_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchiveDecision =
  | "ARCHIVED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchiveStatus;

  readonly historyReference:
    string;

  readonly archiveReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchiveDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerArchive artifact.
 *
 * Archive representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive(
  input: {

    history:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory;

    archiveReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerHistory(
      input.history,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_ARCHIVE_RECORDED",

    historyReference:
      input.history.historyReference,

    archiveReference:
      input.archiveReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.history.decision === "PRESERVED" &&
      input.archiveReference.length > 0 &&
      input.lineage.length > 0
        ? "ARCHIVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),

  });

}

/**
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive(
  archive:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive,
): boolean {

  return (

    archive.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_ARCHIVE_RECORDED" &&

    archive.historyReference.length > 0 &&

    archive.archiveReference.length > 0 &&

    archive.lineage.length > 0 &&

    archive.createdAt.length > 0 &&

    (
      archive.decision === "ARCHIVED" ||
      archive.decision === "REVIEW"
    )

  );

}
