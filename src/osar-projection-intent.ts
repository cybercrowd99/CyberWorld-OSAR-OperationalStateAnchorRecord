/**
 * CyberWorld-OSAR — OSARProjectionIntent Artifact
 * 
 * OSARProjectionIntent defines the bounded projection
 * preparation layer responsible for representing an approved
 * request to expose an OSAR operational context.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize exposure
 * - expand visibility
 * - modify OSAR state
 * - modify world state
 *
 * Projection intent only:
 * - preserves context reference
 * - preserves lane relationship
 * - preserves governance boundary
 * - supports controlled NET projection preparation
 */

import {
  OSAROperationalContext,
  validateOSAROperationalContext,
} from "./osar-operational-context";

export type OSARProjectionIntentStatus =
  | "PROJECTION_INTENT_REGISTERED";

export type OSARProjectionIntentDecision =
  | "APPROVED"
  | "REVIEW"
  | "REJECTED";

/**
 * Projection intent artifact.
 */
export interface OSARProjectionIntent {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionIntentStatus;

  /**
   * Operational context reference.
   */
  readonly contextReference:
    string;

  /**
   * Target projection lane.
   */
  readonly projectionLane:
    string;

  /**
   * Governance boundary reference.
   */
  readonly governanceBoundary:
    string;

  /**
   * Projection intent decision.
   */
  readonly decision:
    OSARProjectionIntentDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection intent artifact.
 *
 * Preparation representation only.
 */
export function createOSARProjectionIntent(input: {
  context:
    OSAROperationalContext;

  projectionLane:
    string;

  governanceBoundary:
    string;
}): OSARProjectionIntent {

  const valid =
    validateOSAROperationalContext(
      input.context,
    );

  return Object.freeze({
    status:
      "PROJECTION_INTENT_REGISTERED",

    contextReference:
      input.context.envelopeReference,

    projectionLane:
      input.projectionLane,

    governanceBoundary:
      input.governanceBoundary,

    decision:
      valid &&
      input.projectionLane.length > 0 &&
      input.governanceBoundary.length > 0
        ? "APPROVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection intent structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionIntent(
  intent: OSARProjectionIntent,
): boolean {

  return (
    intent.status ===
      "PROJECTION_INTENT_REGISTERED" &&
    intent.contextReference.length > 0 &&
    intent.projectionLane.length > 0 &&
    intent.governanceBoundary.length > 0 &&
    intent.createdAt.length > 0 &&
    (
      intent.decision === "APPROVED" ||
      intent.decision === "REVIEW" ||
      intent.decision === "REJECTED"
    )
  );
}
