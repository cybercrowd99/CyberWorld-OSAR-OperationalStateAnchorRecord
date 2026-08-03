/**
 * CyberWorld-OSAR — OSARProjectionContinuity Artifact
 *
 * OSARProjectionContinuity defines the bounded continuity
 * representation layer responsible for preserving the complete
 * historical projection chain after projection history recording.
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
 * Continuity representation only:
 * - preserves projection progression
 * - maintains historical references
 * - records continuity condition
 * - supports structural verification
 */

import {
  OSARProjectionHistory,
  validateOSARProjectionHistory,
} from "./osar-projection-history";

export type OSARProjectionContinuityStatus =
  | "PROJECTION_CONTINUITY_RECORDED";

export type OSARProjectionContinuityDecision =
  | "CONTINUOUS"
  | "REVIEW"
  | "BROKEN";

/**
 * Projection continuity artifact.
 */
export interface OSARProjectionContinuity {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionContinuityStatus;

  /**
   * History reference.
   */
  readonly historyReference:
    string;

  /**
   * Continuity anchor.
   */
  readonly continuityReference:
    string;

  /**
   * Continuity decision.
   */
  readonly decision:
    OSARProjectionContinuityDecision;

  /**
   * Continuity timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection continuity artifact.
 *
 * Continuity representation only.
 */
export function createOSARProjectionContinuity(input: {
  history:
    OSARProjectionHistory;

  continuityReference:
    string;
}): OSARProjectionContinuity {

  const valid =
    validateOSARProjectionHistory(
      input.history,
    );

  return Object.freeze({
    status:
      "PROJECTION_CONTINUITY_RECORDED",

    historyReference:
      input.history.historyReference,

    continuityReference:
      input.continuityReference,

    decision:
      valid &&
      input.continuityReference.length > 0
        ? "CONTINUOUS"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection continuity structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionContinuity(
  continuity: OSARProjectionContinuity,
): boolean {

  return (
    continuity.status ===
      "PROJECTION_CONTINUITY_RECORDED" &&
    continuity.historyReference.length > 0 &&
    continuity.continuityReference.length > 0 &&
    continuity.createdAt.length > 0 &&
    (
      continuity.decision === "CONTINUOUS" ||
      continuity.decision === "REVIEW" ||
      continuity.decision === "BROKEN"
    )
  );
}
