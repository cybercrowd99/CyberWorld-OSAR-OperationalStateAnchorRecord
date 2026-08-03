/**
 * CyberWorld-OSAR — OSARResolution Artifact
 *
 * OSARResolution defines the bounded resolution layer
 * responsible for closing a represented operational condition.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - modify world state
 * - bypass lifecycle rules
 *
 * Resolution only:
 * - records closure
 * - preserves condition lineage
 * - preserves evaluation history
 * - preserves lifecycle completion
 */

import { OSARTransition } from "./osar-transition";

export type OSARResolutionStatus =
  | "RESOLUTION_RECORDED";

export type OSARResolutionDecision =
  | "RESOLVED"
  | "EXPIRED"
  | "CANCELLED";

/**
 * Resolution artifact.
 */
export interface OSARResolution {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARResolutionStatus;

  /**
   * Resolution decision.
   */
  readonly decision:
    OSARResolutionDecision;

  /**
   * Transition reference.
   */
  readonly transitionReference:
    string;

  /**
   * Resolution timestamp.
   */
  readonly resolvedAt:
    string;
}

/**
 * Create OSAR resolution artifact.
 *
 * Resolution representation only.
 */
export function createOSARResolution(input: {
  transition: OSARTransition;
  decision: OSARResolutionDecision;
}): OSARResolution {

  return Object.freeze({
    status:
      "RESOLUTION_RECORDED",

    decision:
      input.decision,

    transitionReference:
      input.transition.evaluationReference,

    resolvedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate OSAR resolution structure.
 *
 * Structural validation only.
 */
export function validateOSARResolution(
  resolution: OSARResolution,
): boolean {
  return (
    resolution.status ===
      "RESOLUTION_RECORDED" &&
    resolution.transitionReference.length > 0 &&
    resolution.resolvedAt.length > 0 &&
    (
      resolution.decision === "RESOLVED" ||
      resolution.decision === "EXPIRED" ||
      resolution.decision === "CANCELLED"
    )
  );
}
