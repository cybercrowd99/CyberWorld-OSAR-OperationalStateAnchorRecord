/**
 * CyberWorld-OSAR — OSARProjectionHistory Artifact
 *
 * OSARProjectionHistory defines the bounded historical
 * representation layer responsible for preserving completed
 * projection lineage after closure recording.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 * - expand visibility
 * - mutate OSAR artifacts
 * - modify world state
 *
 * Historical representation only:
 * - preserves closure lineage
 * - records projection history
 * - maintains verification continuity
 * - supports structural review
 */

import {
  OSARProjectionClosure,
  validateOSARProjectionClosure,
} from "./osar-projection-closure";

export type OSARProjectionHistoryStatus =
  | "PROJECTION_HISTORY_RECORDED";

export type OSARProjectionHistoryDecision =
  | "PRESERVED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection history artifact.
 */
export interface OSARProjectionHistory {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionHistoryStatus;

  /**
   * Closure reference.
   */
  readonly closureReference:
    string;

  /**
   * Historical lineage reference.
   */
  readonly historyReference:
    string;

  /**
   * History decision.
   */
  readonly decision:
    OSARProjectionHistoryDecision;

  /**
   * History timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection history artifact.
 *
 * Historical representation only.
 */
export function createOSARProjectionHistory(input: {
  closure:
    OSARProjectionClosure;

  historyReference:
    string;
}): OSARProjectionHistory {

  const valid =
    validateOSARProjectionClosure(
      input.closure,
    );

  return Object.freeze({
    status:
      "PROJECTION_HISTORY_RECORDED",

    closureReference:
      input.closure.completionReference,

    historyReference:
      input.historyReference,

    decision:
      valid &&
      input.historyReference.length > 0
        ? "PRESERVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection history structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionHistory(
  history: OSARProjectionHistory,
): boolean {

  return (
    history.status ===
      "PROJECTION_HISTORY_RECORDED" &&
    history.closureReference.length > 0 &&
    history.historyReference.length > 0 &&
    history.createdAt.length > 0 &&
    (
      history.decision === "PRESERVED" ||
      history.decision === "REVIEW" ||
      history.decision === "INVALID"
    )
  );
}
