/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityHistory Artifact
 *
 * OSARProjectionAssuranceIntegrityHistory defines the bounded historical layer
 * responsible for preserving a closed integrity-checkpoint lineage following
 * integrity-closure recording.
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
 * History representation only:
 * - preserves closure lineage
 * - records historical references
 * - maintains immutable ordering
 * - supports structural integrity continuity review
 */

import {
  OSARProjectionAssuranceIntegrityClosure,
  validateOSARProjectionAssuranceIntegrityClosure,
} from "./osar-projection-assurance-integrity-closure";

export type OSARProjectionAssuranceIntegrityHistoryStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_HISTORY_RECORDED";

export type OSARProjectionAssuranceIntegrityHistoryDecision =
  | "PRESERVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity history artifact.
 */
export interface OSARProjectionAssuranceIntegrityHistory {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityHistoryStatus;

  /**
   * Closure reference.
   */
  readonly closureReference:
    string;

  /**
   * History reference.
   */
  readonly historyReference:
    string;

  /**
   * Ordered historical lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * History decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityHistoryDecision;

  /**
   * History timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity history artifact.
 *
 * History representation only.
 */
export function createOSARProjectionAssuranceIntegrityHistory(input: {
  integrityClosure:
    OSARProjectionAssuranceIntegrityClosure;

  historyReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityHistory {

  const valid =
    validateOSARProjectionAssuranceIntegrityClosure(
      input.integrityClosure,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_HISTORY_RECORDED",

    closureReference:
      input.integrityClosure.closureReference,

    historyReference:
      input.historyReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.integrityClosure.decision === "CLOSED" &&
      input.historyReference.length > 0 &&
      input.lineage.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity history structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityHistory(
  history:
    OSARProjectionAssuranceIntegrityHistory,
): boolean {

  return (
    history.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_HISTORY_RECORDED" &&
    history.closureReference.length > 0 &&
    history.historyReference.length > 0 &&
    history.lineage.length > 0 &&
    history.createdAt.length > 0 &&
    (
      history.decision === "PRESERVED" ||
      history.decision === "REVIEW" ||
      history.decision === "INVALID"
    )
  );
}
