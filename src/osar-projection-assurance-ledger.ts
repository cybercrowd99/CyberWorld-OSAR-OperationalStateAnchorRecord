/**
 * CyberWorld-OSAR — OSARProjectionAssuranceLedger Artifact
 *
 * OSARProjectionAssuranceLedger defines the bounded assurance-history layer
 * responsible for recording assurance continuity after assurance-record
 * registration.
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
 * Assurance ledger representation only:
 * - preserves assurance lineage
 * - records assurance history references
 * - maintains immutable ordering
 * - supports structural assurance verification
 */

import {
  OSARProjectionAssuranceRecord,
  validateOSARProjectionAssuranceRecord,
} from "./osar-projection-assurance-record";

export type OSARProjectionAssuranceLedgerStatus =
  | "PROJECTION_ASSURANCE_LEDGER_RECORDED";

export type OSARProjectionAssuranceLedgerDecision =
  | "RECORDED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance ledger artifact.
 */
export interface OSARProjectionAssuranceLedger {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceLedgerStatus;

  /**
   * Assurance record reference.
   */
  readonly assuranceRecordReference:
    string;

  /**
   * Assurance ledger reference.
   */
  readonly assuranceLedgerReference:
    string;

  /**
   * Ordered assurance lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Assurance ledger decision.
   */
  readonly decision:
    OSARProjectionAssuranceLedgerDecision;

  /**
   * Ledger creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance ledger artifact.
 *
 * Assurance ledger representation only.
 */
export function createOSARProjectionAssuranceLedger(input: {
  assuranceRecord:
    OSARProjectionAssuranceRecord;

  assuranceLedgerReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceLedger {

  const valid =
    validateOSARProjectionAssuranceRecord(
      input.assuranceRecord,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_LEDGER_RECORDED",

    assuranceRecordReference:
      input.assuranceRecord.assuranceReference,

    assuranceLedgerReference:
      input.assuranceLedgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceRecord.decision === "ASSURED" &&
      input.assuranceLedgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceLedger(
  ledger: OSARProjectionAssuranceLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_ASSURANCE_LEDGER_RECORDED" &&
    ledger.assuranceRecordReference.length > 0 &&
    ledger.assuranceLedgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "RECORDED" ||
      ledger.decision === "REVIEW" ||
      ledger.decision === "INVALID"
    )
  );
}
