/**
 * CyberWorld-OSAR — OSARProjectionAssuranceHistory Artifact
 * 
 * OSARProjectionAssuranceHistory defines the bounded historical layer
 * responsible for preserving a closed assurance checkpoint lineage after
 * closure recording.
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
 * - supports structural assurance continuity review
 */

import {
  OSARProjectionAssuranceClosure,
  validateOSARProjectionAssuranceClosure,
} from "./osar-projection-assurance-closure";

export type OSARProjectionAssuranceHistoryStatus =
  | "PROJECTION_ASSURANCE_HISTORY_RECORDED";

export type OSARProjectionAssuranceHistoryDecision =
  | "PRESERVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance history artifact.
 */
export interface OSARProjectionAssuranceHistory {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceHistoryStatus;

  /**
   * Closure reference.
   */
  readonly closureReference:
    string;

  /**
   * Historical continuity reference.
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
    OSARProjectionAssuranceHistoryDecision;

  /**
   * History timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance history artifact.
 *
 * History representation only.
 */
export function createOSARProjectionAssuranceHistory(input: {
  assuranceClosure:
    OSARProjectionAssuranceClosure;

  historyReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceHistory {

  const valid =
    validateOSARProjectionAssuranceClosure(
      input.assuranceClosure,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_HISTORY_RECORDED",

    closureReference:
      input.assuranceClosure.closureReference,

    historyReference:
      input.historyReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceClosure.decision === "CLOSED" &&
      input.historyReference.length > 0 &&
      input.lineage.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance history structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceHistory(
  history: OSARProjectionAssuranceHistory,
): boolean {

  return (
    history.status ===
      "PROJECTION_ASSURANCE_HISTORY_RECORDED" &&
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
