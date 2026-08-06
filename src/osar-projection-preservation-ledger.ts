/**
 * CyberWorld-OSAR — OSARProjectionPreservationLedger Artifact
 * 
 * OSARProjectionPreservationLedger defines the bounded preservation
 * ledger representation layer responsible for recording retained
 * projection continuity references.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 * - expand visibility
 * - mutate OSAR artifacts
 * - modify world state
 * - create financial ledger semantics
 *
 * Preservation ledger representation only:
 * - preserves retention lineage
 * - records historical continuity references
 * - maintains immutable ordering
 * - supports structural verification history
 */

import {
  OSARProjectionRetention,
  validateOSARProjectionRetention,
} from "./osar-projection-retention";

export type OSARProjectionPreservationLedgerStatus =
  | "PROJECTION_PRESERVATION_LEDGER_RECORDED";

export type OSARProjectionPreservationLedgerDecision =
  | "RECORDED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection preservation ledger artifact.
 */
export interface OSARProjectionPreservationLedger {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionPreservationLedgerStatus;

  /**
   * Retention reference.
   */
  readonly retentionReference:
    string;

  /**
   * Preservation ledger reference.
   */
  readonly ledgerReference:
    string;

  /**
   * Ordered preservation entries.
   */
  readonly lineage:
    readonly string[];

  /**
   * Preservation ledger decision.
   */
  readonly decision:
    OSARProjectionPreservationLedgerDecision;

  /**
   * Ledger timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection preservation ledger artifact.
 *
 * Preservation ledger representation only.
 */
export function createOSARProjectionPreservationLedger(input: {
  retention:
    OSARProjectionRetention;

  ledgerReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionPreservationLedger {

  const valid =
    validateOSARProjectionRetention(
      input.retention,
    );

  return Object.freeze({
    status:
      "PROJECTION_PRESERVATION_LEDGER_RECORDED",

    retentionReference:
      input.retention.retentionReference,

    ledgerReference:
      input.ledgerReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.retention.decision === "RETAINED" &&
      input.ledgerReference.length > 0 &&
      input.lineage.length > 0
        ? "RECORDED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection preservation ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionPreservationLedger(
  ledger: OSARProjectionPreservationLedger,
): boolean {

  return (
    ledger.status ===
      "PROJECTION_PRESERVATION_LEDGER_RECORDED" &&
    ledger.retentionReference.length > 0 &&
    ledger.ledgerReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "RECORDED" ||
      ledger.decision === "REVIEW" ||
      ledger.decision === "INVALID"
    )
  );
}
