/**
 * CyberWorld-OSAR — OSARProjectionDecision Artifact
 *
 * OSARProjectionDecision defines the bounded decision layer
 * responsible for representing the result of a projection
 * gate evaluation before NET projection handling.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize visibility
 * - expand scope
 * - modify OSAR artifacts
 * - modify world state
 *
 * Decision representation only:
 * - preserves gate lineage
 * - records projection outcome
 * - maintains governance boundary
 * - supports controlled NET movement
 */

import {
  OSARProjectionGate,
  validateOSARProjectionGate,
} from "./osar-projection-gate";

export type OSARProjectionDecisionStatus =
  | "PROJECTION_DECISION_RECORDED";

export type OSARProjectionDecisionOutcome =
  | "APPROVED"
  | "REVIEW"
  | "REJECTED";

/**
 * Projection decision artifact.
 */
export interface OSARProjectionDecision {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionDecisionStatus;

  /**
   * Gate reference.
   */
  readonly gateReference:
    string;

  /**
   * Decision outcome.
   */
  readonly outcome:
    OSARProjectionDecisionOutcome;

  /**
   * Decision reason.
   */
  readonly reason:
    string;

  /**
   * Decision timestamp.
   */
  readonly decidedAt:
    string;
}

/**
 * Create projection decision artifact.
 *
 * Decision representation only.
 */
export function createOSARProjectionDecision(input: {
  gate:
    OSARProjectionGate;

  reason?: string;
}): OSARProjectionDecision {

  const valid =
    validateOSARProjectionGate(
      input.gate,
    );

  return Object.freeze({
    status:
      "PROJECTION_DECISION_RECORDED",

    gateReference:
      input.gate.requestReference,

    outcome:
      valid &&
      input.gate.decision === "PASS"
        ? "APPROVED"
        : "REVIEW",

    reason:
      input.reason ??
      (
        valid
          ? "PROJECTION_GATE_APPROVED"
          : "PROJECTION_GATE_REQUIRES_REVIEW"
      ),

    decidedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection decision structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionDecision(
  decision: OSARProjectionDecision,
): boolean {

  return (
    decision.status ===
      "PROJECTION_DECISION_RECORDED" &&
    decision.gateReference.length > 0 &&
    decision.reason.length > 0 &&
    decision.decidedAt.length > 0 &&
    (
      decision.outcome === "APPROVED" ||
      decision.outcome === "REVIEW" ||
      decision.outcome === "REJECTED"
    )
  );
}
