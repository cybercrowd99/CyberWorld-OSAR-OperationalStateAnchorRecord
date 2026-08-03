/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmationLedger Artifact
 *
 * OSARProjectionAssuranceIntegrityConfirmationLedger defines the bounded
 * confirmation-ledger layer responsible for recording confirmation-continuity
 * lineage following integrity-confirmation registration.
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
 * Confirmation-ledger representation only:
 * - preserves confirmation lineage
 * - records confirmation-history references
 * - maintains immutable ordering
 * - supports structural integrity verification history
 */

import {
  OSARProjectionAssuranceIntegrityConfirmation,
  validateOSARProjectionAssuranceIntegrityConfirmation,
} from "./osar-projection-assurance-integrity-confirmation";

export type OSARProjectionAssuranceIntegrityConfirmationLedgerStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_LEDGER_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationLedgerDecision =
  | "RECORDED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity confirmation-ledger artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmationLedger {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationLedgerStatus;

  /**
   * Confirmation reference.
   */
  readonly confirmationReference:
    string;

  /**
   * Confirmation-ledger reference.
   */
  readonly confirmationLedgerReference:
    string;

  /**
   * Ordered confirmation-ledger lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Confirmation-ledger decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationLedgerDecision;

  /**
   * Confirmation-ledger timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity confirmation-ledger artifact.
 *
 * Confirmation-ledger representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmationLedger(input: {
  integrityConfirmation:
    OSARProjectionAssuranceIntegrityConfirmation;

  confirmationLedgerReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityConfirmationLedger {

  const valid =
    validateOSARProjectionAssuranceIntegrityConfirmation(
      input.integrityConfirmation,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_LEDGER_RECORDED",

    confirmationReference:
      input.integrityConfirmation.confirmationReference,

    confirmationLedgerReference:
      input.confirmationLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.integrityConfirmation.decision === "CONFIRMED" &&
      input.confirmationLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity confirmation-ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmationLedger(
  ledger:
    OSARProjectionAssuranceIntegrityConfirmationLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_LEDGER_RECORDED" &&
    ledger.confirmationReference.length > 0 &&
    ledger.confirmationLedgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "RECORDED" ||
      ledger.decision === "REVIEW" ||
      ledger.decision === "INVALID"
    )
  );
}
