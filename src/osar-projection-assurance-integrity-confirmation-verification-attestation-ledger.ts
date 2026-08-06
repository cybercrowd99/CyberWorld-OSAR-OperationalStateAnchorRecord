/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedger Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedger
 * defines the bounded attestation-ledger layer responsible for recording
 * integrity-confirmation-verification-attestation lineage following attestation
 * confirmation.
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
 * Integrity-confirmation-verification-attestation ledger representation only:
 * - preserves attestation lineage
 * - records attestation-history references
 * - maintains immutable ordering
 * - supports structural integrity continuity verification
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation,
  validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestation,
} from "./osar-projection-assurance-integrity-confirmation-verification-attestation";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedgerStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_LEDGER_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedgerDecision =
  | "RECORDED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity confirmation verification attestation ledger artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedger {

  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedgerStatus;

  /**
   * Attestation reference.
   */
  readonly attestationReference:
    string;

  /**
   * Attestation ledger reference.
   */
  readonly attestationLedgerReference:
    string;

  /**
   * Ordered attestation-ledger lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Attestation-ledger decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedgerDecision;

  /**
   * Attestation-ledger timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification attestation ledger artifact.
 *
 * Attestation-ledger representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedger(
  input: {
    assuranceAttestation:
      OSARProjectionAssuranceIntegrityConfirmationVerificationAttestation;

    attestationLedgerReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedger {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestation(
      input.assuranceAttestation,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_LEDGER_RECORDED",

    attestationReference:
      input.assuranceAttestation.attestationReference,

    attestationLedgerReference:
      input.attestationLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceAttestation.decision === "ATTESTED" &&
      input.attestationLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification attestation ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedger(
  ledger:
    OSARProjectionAssuranceIntegrityConfirmationVerificationAttestationLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_ATTESTATION_LEDGER_RECORDED" &&
    ledger.attestationReference.length > 0 &&
    ledger.attestationLedgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "RECORDED" ||
      ledger.decision === "REVIEW" ||
      ledger.decision === "INVALID"
    )
  );
}
