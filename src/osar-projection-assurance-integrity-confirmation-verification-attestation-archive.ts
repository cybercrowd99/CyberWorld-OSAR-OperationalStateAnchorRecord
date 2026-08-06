/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchive Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchive
 * defines the bounded archival layer responsible for preserving a completed
 * integrity-confirmation-verification-attestation-history checkpoint for
 * long-term structural reference.
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
 * - supports long-term structural integrity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-history";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchiveStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_ARCHIVE_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchiveDecision =
  | "ARCHIVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity confirmation verification attestation archive artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchive {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchiveStatus;

  readonly historyReference:
    string;

  readonly archiveReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchiveDecision;

  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation archive artifact.
 *
 * Archive representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchive(
  input: {
    assuranceHistory:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory;

    archiveReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchive {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory(
      input.assuranceHistory,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_ARCHIVE_RECORDED",

    historyReference:
      input.assuranceHistory.historyReference,

    archiveReference:
      input.archiveReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceHistory.decision === "PRESERVED" &&
      input.archiveReference.length > 0 &&
      input.lineage.length > 0
        ? "ARCHIVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation archive structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchive(
  archive:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationArchive,
): boolean {

  return (
    archive.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_ARCHIVE_RECORDED" &&

    archive.historyReference.length > 0 &&

    archive.archiveReference.length > 0 &&

    archive.lineage.length > 0 &&

    archive.createdAt.length > 0 &&

    (
      archive.decision === "ARCHIVED" ||
      archive.decision === "REVIEW" ||
      archive.decision === "INVALID"
    )
  );
}
