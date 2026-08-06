/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation
 * defines the bounded preservation layer responsible for confirming that an
 * archived preservation-verification-ledger-history checkpoint remains
 * structurally preserved for continuity reference.
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
 * Preservation representation only:
 * - preserves archive lineage
 * - records preservation references
 * - maintains immutable checkpoints
 * - supports structural integrity continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-preservation-verification-ledger-archive";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationDecision =
  | "PRESERVED"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationStatus;

  readonly archiveReference:
    string;

  readonly preservationReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservationDecision;

  readonly createdAt:
    string;
}

/**
 * Create PreservationVerificationLedgerPreservation artifact.
 *
 * Preservation representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation(
  input: {

    archive:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive;

    preservationReference:
      string;

    lineage:
      readonly string[];

  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerArchive(
      input.archive,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_RECORDED",

    archiveReference:
      input.archive.archiveReference,

    preservationReference:
      input.preservationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.archive.decision === "ARCHIVED" &&
      input.preservationReference.length > 0 &&
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
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation(
  preservation:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationVerificationLedgerPreservation,
): boolean {

  return (

    preservation.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_VERIFICATION_LEDGER_PRESERVATION_RECORDED" &&

    preservation.archiveReference.length > 0 &&

    preservation.preservationReference.length > 0 &&

    preservation.lineage.length > 0 &&

    preservation.createdAt.length > 0 &&

    (
      preservation.decision === "PRESERVED" ||
      preservation.decision === "REVIEW"
    )

  );

}
