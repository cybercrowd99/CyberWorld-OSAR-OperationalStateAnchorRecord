/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityLedger Artifact
 * 
 * OSARProjectionAssuranceIntegrityLedger defines the bounded integrity-ledger layer
 * responsible for recording integrity-continuity lineage after integrity confirmation.
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
 * Integrity-ledger representation only:
 * - preserves integrity lineage
 * - records integrity-history references
 * - maintains immutable ordering
 * - supports structural integrity verification history
 */

import {
  OSARProjectionAssuranceIntegrity,
  validateOSARProjectionAssuranceIntegrity,
} from "./osar-projection-assurance-integrity";

export type OSARProjectionAssuranceIntegrityLedgerStatus =
  | "PROJECTION_ASSURANCE_INTEGRITY_LEDGER_RECORDED";

export type OSARProjectionAssuranceIntegrityLedgerDecision =
  | "RECORDED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity ledger artifact.
 */
export interface OSARProjectionAssuranceIntegrityLedger {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityLedgerStatus;

  /**
   * Integrity reference.
   */
  readonly integrityReference:
    string;

  /**
   * Integrity ledger reference.
   */
  readonly integrityLedgerReference:
    string;

  /**
   * Ordered integrity lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Integrity ledger decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityLedgerDecision;

  /**
   * Ledger creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity ledger artifact.
 *
 * Integrity-ledger representation only.
 */
export function createOSARProjectionAssuranceIntegrityLedger(input: {
  assuranceIntegrity:
    OSARProjectionAssuranceIntegrity;

  integrityLedgerReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityLedger {

  const valid =
    validateOSARProjectionAssuranceIntegrity(
      input.assuranceIntegrity,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_LEDGER_RECORDED",

    integrityReference:
      input.assuranceIntegrity.integrityReference,

    integrityLedgerReference:
      input.integrityLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceIntegrity.decision === "VALID" &&
      input.integrityLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityLedger(
  ledger: OSARProjectionAssuranceIntegrityLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_LEDGER_RECORDED" &&
    ledger.integrityReference.length > 0 &&
    ledger.integrityLedgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "RECORDED" ||
      ledger.decision === "REVIEW" ||
      ledger.decision === "INVALID"
    )
  );
}
