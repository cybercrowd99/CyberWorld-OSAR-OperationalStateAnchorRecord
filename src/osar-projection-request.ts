/**
 * CyberWorld-OSAR — OSARProjectionRequest Artifact
 * 
 * OSARProjectionRequest defines the bounded request layer
 * responsible for representing a controlled request to move
 * an approved projection intent toward NET handling.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize projection
 * - expand visibility
 * - modify OSAR artifacts
 * - modify world state
 *
 * Request representation only:
 * - preserves projection intent lineage
 * - preserves governance boundaries
 * - preserves lane targeting
 * - supports controlled projection flow
 */

import {
  OSARProjectionIntent,
  validateOSARProjectionIntent,
} from "./osar-projection-intent";

export type OSARProjectionRequestStatus =
  | "PROJECTION_REQUEST_REGISTERED";

export type OSARProjectionRequestDecision =
  | "READY"
  | "REVIEW"
  | "REJECTED";

/**
 * Projection request artifact.
 */
export interface OSARProjectionRequest {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionRequestStatus;

  /**
   * Projection intent reference.
   */
  readonly intentReference:
    string;

  /**
   * Requested NET lane.
   */
  readonly requestedLane:
    string;

  /**
   * Governance boundary reference.
   */
  readonly governanceBoundary:
    string;

  /**
   * Request decision.
   */
  readonly decision:
    OSARProjectionRequestDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection request artifact.
 *
 * Request representation only.
 */
export function createOSARProjectionRequest(input: {
  intent:
    OSARProjectionIntent;

  requestedLane:
    string;
}): OSARProjectionRequest {

  const valid =
    validateOSARProjectionIntent(
      input.intent,
    );

  return Object.freeze({
    status:
      "PROJECTION_REQUEST_REGISTERED",

    intentReference:
      input.intent.contextReference,

    requestedLane:
      input.requestedLane,

    governanceBoundary:
      input.intent.governanceBoundary,

    decision:
      valid &&
      input.requestedLane.length > 0
        ? "READY"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection request structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionRequest(
  request: OSARProjectionRequest,
): boolean {

  return (
    request.status ===
      "PROJECTION_REQUEST_REGISTERED" &&
    request.intentReference.length > 0 &&
    request.requestedLane.length > 0 &&
    request.governanceBoundary.length > 0 &&
    request.createdAt.length > 0 &&
    (
      request.decision === "READY" ||
      request.decision === "REVIEW" ||
      request.decision === "REJECTED"
    )
  );
}
