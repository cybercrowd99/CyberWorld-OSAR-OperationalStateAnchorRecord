/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalization Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalization
 * defines the bounded finalization layer responsible for recording closure of an
 * attested integrity-confirmation-verification checkpoint.
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
 * Integrity-confirmation-verification-attestation finalization representation only:
 * - preserves attestation lineage
 * - records finalization references
 * - maintains immutable checkpoints
 * - supports structural integrity continuity closure
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestation,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalizationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_FINALIZATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalizationDecision =
  | "FINALIZED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity confirmation verification attestation finalization artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalization {

  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalizationStatus;

  readonly attestationReference:
    string;

  readonly finalizationReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalizationDecision;

  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation finalization artifact.
 *
 * Finalization representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalization(
  input: {
    assuranceAttestation:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation;

    finalizationReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalization {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestation(
      input.assuranceAttestation,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_FINALIZATION_RECORDED",

    attestationReference:
      input.assuranceAttestation.attestationReference,

    finalizationReference:
      input.finalizationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceAttestation.decision === "ATTESTED" &&
      input.finalizationReference.length > 0 &&
      input.lineage.length > 0
        ? "FINALIZED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation finalization structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalization(
  finalization:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationFinalization,
): boolean {

  return (
    finalization.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_FINALIZATION_RECORDED" &&

    finalization.attestationReference.length > 0 &&

    finalization.finalizationReference.length > 0 &&

    finalization.lineage.length > 0 &&

    finalization.createdAt.length > 0 &&

    (
      finalization.decision === "FINALIZED" ||
      finalization.decision === "REVIEW" ||
      finalization.decision === "INVALID"
    )
  );
}
