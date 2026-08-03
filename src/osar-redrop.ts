/**
 * CyberWorld-OSAR — OSARRedrop Artifact
 *
 * OSARRedrop defines the bounded recovery representation
 * for NET projection failures where OSAR integrity remains valid.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - recreate operational state
 * - recreate anchors
 * - bypass lifecycle rules
 * - modify world state
 *
 * Redrop only:
 * - records projection failure
 * - preserves anchor continuity
 * - preserves evaluation lineage
 * - supports NET-only recovery
 */

import { OSARResolution } from "./osar-resolution";

export type OSARRedropStatus =
  | "REDROP_RECORDED";

export type OSARRedropDecision =
  | "REPROJECT"
  | "MANUAL_REVIEW"
  | "TERMINATED";

/**
 * Redrop artifact.
 */
export interface OSARRedrop {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARRedropStatus;

  /**
   * Redrop decision.
   */
  readonly decision:
    OSARRedropDecision;

  /**
   * Resolution reference.
   */
  readonly resolutionReference:
    string;

  /**
   * Reason for projection failure.
   */
  readonly reason:
    string;

  /**
   * Redrop timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create OSAR redrop artifact.
 *
 * Recovery representation only.
 */
export function createOSARRedrop(input: {
  resolution: OSARResolution;
  decision: OSARRedropDecision;
  reason: string;
}): OSARRedrop {

  return Object.freeze({
    status:
      "REDROP_RECORDED",

    decision:
      input.decision,

    resolutionReference:
      input.resolution.transitionReference,

    reason:
      input.reason,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate OSAR redrop structure.
 *
 * Structural validation only.
 */
export function validateOSARRedrop(
  redrop: OSARRedrop,
): boolean {
  return (
    redrop.status ===
      "REDROP_RECORDED" &&
    redrop.resolutionReference.length > 0 &&
    redrop.reason.length > 0 &&
    redrop.createdAt.length > 0 &&
    (
      redrop.decision === "REPROJECT" ||
      redrop.decision === "MANUAL_REVIEW" ||
      redrop.decision === "TERMINATED"
    )
  );
}
