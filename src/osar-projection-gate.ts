/**
 * CyberWorld-OSAR — OSARProjectionGate Artifact
 *
 * OSARProjectionGate defines the bounded gate layer
 * responsible for representing the structural checkpoint
 * before NET projection execution.
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
 * Gate representation only:
 * - validates projection request structure
 * - preserves request lineage
 * - preserves governance boundary
 * - supports controlled projection decisions
 */

import {
  OSARProjectionRequest,
  validateOSARProjectionRequest,
} from "./osar-projection-request";

export type OSARProjectionGateStatus =
  | "PROJECTION_GATE_EVALUATED";

export type OSARProjectionGateDecision =
  | "PASS"
  | "REVIEW"
  | "BLOCK";

/**
 * Projection gate artifact.
 */
export interface OSARProjectionGate {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionGateStatus;

  /**
   * Projection request reference.
   */
  readonly requestReference:
    string;

  /**
   * Gate decision.
   */
  readonly decision:
    OSARProjectionGateDecision;

  /**
   * Gate reason.
   */
  readonly reason:
    string;

  /**
   * Evaluation timestamp.
   */
  readonly evaluatedAt:
    string;
}

/**
 * Create projection gate artifact.
 *
 * Structural checkpoint only.
 */
export function createOSARProjectionGate(input: {
  request:
    OSARProjectionRequest;

  reason?: string;
}): OSARProjectionGate {

  const valid =
    validateOSARProjectionRequest(
      input.request,
    );

  return Object.freeze({
    status:
      "PROJECTION_GATE_EVALUATED",

    requestReference:
      input.request.intentReference,

    decision:
      valid
        ? "PASS"
        : "REVIEW",

    reason:
      input.reason ??
      (
        valid
          ? "PROJECTION_REQUEST_VALID"
          : "PROJECTION_REQUEST_REQUIRES_REVIEW"
      ),

    evaluatedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection gate structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionGate(
  gate: OSARProjectionGate,
): boolean {

  return (
    gate.status ===
      "PROJECTION_GATE_EVALUATED" &&
    gate.requestReference.length > 0 &&
    gate.reason.length > 0 &&
    gate.evaluatedAt.length > 0 &&
    (
      gate.decision === "PASS" ||
      gate.decision === "REVIEW" ||
      gate.decision === "BLOCK"
    )
  );
}
