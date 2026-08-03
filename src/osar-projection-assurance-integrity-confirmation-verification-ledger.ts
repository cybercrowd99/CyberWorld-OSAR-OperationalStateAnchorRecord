/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationVerificationLedger Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationVerificationLedger defines the bounded
 * verification-ledger layer responsible for recording verification-continuity lineage
 * following integrity-confirmation verification.
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
 * Verification-ledger representation only:
 * - preserves verification lineage
 * - records verification-history references
 * - maintains immutable ordering
 * - supports structural verification continuity review
 */

import {
  OSARProjectionAssuranceIntegrityConfirmationVerification,
  validateOSARProjectionAssuranceIntegrityConfirmationVerification,
} from "./osar-projection-assurance-integrity-confirmation-verification";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationLedgerStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_LEDGER_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationVerificationLedgerDecision =
  | "RECORDED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity confirmation verification ledger artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationVerificationLedger {

  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationVerificationLedgerStatus;

  /**
   * Verification reference.
   */
  readonly verificationReference:
    string;

  /**
   * Verification ledger reference.
   */
  readonly verificationLedgerReference:
    string;

  /**
   * Ordered verification ledger lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Verification ledger decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationVerificationLedgerDecision;

  /**
   * Verification ledger timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation verification ledger artifact.
 *
 * Verification-ledger representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationVerificationLedger(
  input: {
    assuranceVerification:
      OSARProjectionAssuranceIntegrityConfirmationVerification;

    verificationLedgerReference:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityConfirmationVerificationLedger {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmationVerification(
      input.assuranceVerification,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_LEDGER_RECORDED",

    verificationReference:
      input.assuranceVerification.verificationReference,

    verificationLedgerReference:
      input.verificationLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceVerification.decision === "VERIFIED" &&
      input.verificationLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation verification ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationVerificationLedger(
  ledger:
    OSARProjectionAssuranceIntegrityConfirmationVerificationLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_VERIFICATION_LEDGER_RECORDED" &&
    ledger.verificationReference.length > 0 &&
    ledger.verificationLedgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "RECORDED" ||
      ledger.decision === "REVIEW" ||
      ledger.decision === "INVALID"
    )
  );
}
