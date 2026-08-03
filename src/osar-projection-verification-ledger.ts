/**
 * CyberWorld-OSAR — OSARProjectionVerificationLedger Artifact
 *
 * OSARProjectionVerificationLedger defines the bounded verification-history
 * layer responsible for recording structural verification continuity after
 * preservation-ledger registration.
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
 * Verification ledger representation only:
 * - preserves preservation lineage
 * - records verification references
 * - maintains immutable ordering
 * - supports structural verification history
 */

import {
  OSARProjectionPreservationLedger,
  validateOSARProjectionPreservationLedger,
} from "./osar-projection-preservation-ledger";

export type OSARProjectionVerificationLedgerStatus =
  | "PROJECTION_VERIFICATION_LEDGER_RECORDED";

export type OSARProjectionVerificationLedgerDecision =
  | "VERIFIED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection verification ledger artifact.
 */
export interface OSARProjectionVerificationLedger {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionVerificationLedgerStatus;

  /**
   * Preservation ledger reference.
   */
  readonly preservationLedgerReference:
    string;

  /**
   * Verification ledger reference.
   */
  readonly verificationLedgerReference:
    string;

  /**
   * Ordered verification lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Verification decision.
   */
  readonly decision:
    OSARProjectionVerificationLedgerDecision;

  /**
   * Verification timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection verification ledger artifact.
 *
 * Verification ledger representation only.
 */
export function createOSARProjectionVerificationLedger(input: {
  preservationLedger:
    OSARProjectionPreservationLedger;

  verificationLedgerReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionVerificationLedger {

  const valid =
    validateOSARProjectionPreservationLedger(
      input.preservationLedger,
    );

  return Object.freeze({
    status:
      "PROJECTION_VERIFICATION_LEDGER_RECORDED",

    preservationLedgerReference:
      input.preservationLedger.ledgerReference,

    verificationLedgerReference:
      input.verificationLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.preservationLedger.decision === "RECORDED" &&
      input.verificationLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "VERIFIED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection verification ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionVerificationLedger(
  ledger: OSARProjectionVerificationLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_VERIFICATION_LEDGER_RECORDED" &&
    ledger.preservationLedgerReference.length > 0 &&
    ledger.verificationLedgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "VERIFIED" ||
      ledger.decision === "REVIEW" ||
      ledger.decision === "INVALID"
    )
  );
}
