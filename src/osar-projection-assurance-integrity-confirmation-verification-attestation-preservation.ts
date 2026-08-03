/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation
 * defines the bounded preservation layer responsible for confirming that a
 * completed integrity-confirmation-verification-attestation lineage remains
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
 * - preserves attestation-closure lineage
 * - records preservation references
 * - maintains immutable checkpoints
 * - supports structural integrity-continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation-history";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationDecision =
  | "PRESERVED"
  | "REVIEW";

/**
 * Projection assurance integrity confirmation verification attestation preservation artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationStatus;

  /**
   * History reference.
   */
  readonly historyReference:
    string;

  /**
   * Preservation reference describing immutable preservation anchor.
   */
  readonly preservationReference:
    string;

  /**
   * Ordered preservation lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Preservation decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservationDecision;

  /**
   * Preservation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation preservation artifact.
 *
 * Preservation representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation(
  input: {
    assuranceHistory:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory;

    preservationReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationHistory(
      input.assuranceHistory,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_RECORDED",

    historyReference:
      input.assuranceHistory.historyReference,

    preservationReference:
      input.preservationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceHistory.decision === "PRESERVED" &&
      input.preservationReference.length > 0 &&
      input.lineage.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation preservation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation(
  preservation:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationPreservation,
): boolean {

  return (
    preservation.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_PRESERVATION_RECORDED" &&
    preservation.historyReference.length > 0 &&
    preservation.preservationReference.length > 0 &&
    preservation.lineage.length > 0 &&
    preservation.createdAt.length > 0 &&
    (
      preservation.decision === "PRESERVED" ||
      preservation.decision === "REVIEW"
    )
  );
}
