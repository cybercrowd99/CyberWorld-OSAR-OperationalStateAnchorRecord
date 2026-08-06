/**
 * CyberWorld-OSAR — OSARNetProjectionEnvelope Artifact
 * 
 * OSARNetProjectionEnvelope defines the bounded NET handoff
 * representation layer responsible for carrying an approved
 * projection authorization into controlled NET projection flow.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - grant permissions
 * - expose private information
 * - expand visibility
 * - modify OSAR artifacts
 * - modify world state
 *
 * NET handoff representation only:
 * - preserves authorization lineage
 * - preserves projection boundary
 * - preserves lane targeting
 * - supports controlled surface projection
 */

import {
  OSARProjectionAuthorization,
  validateOSARProjectionAuthorization,
} from "./osar-projection-authorization";

export type OSARNetProjectionEnvelopeStatus =
  | "NET_PROJECTION_ENVELOPE_CREATED";

export type OSARNetProjectionEnvelopeDecision =
  | "READY"
  | "REVIEW"
  | "BLOCKED";

/**
 * NET projection envelope artifact.
 */
export interface OSARNetProjectionEnvelope {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARNetProjectionEnvelopeStatus;

  /**
   * Authorization reference.
   */
  readonly authorizationReference:
    string;

  /**
   * NET capability lane.
   */
  readonly capabilityLane:
    string;

  /**
   * Projection boundary.
   */
  readonly projectionBoundary:
    string;

  /**
   * Envelope decision.
   */
  readonly decision:
    OSARNetProjectionEnvelopeDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create NET projection envelope artifact.
 *
 * Handoff representation only.
 */
export function createOSARNetProjectionEnvelope(input: {
  authorization:
    OSARProjectionAuthorization;

  capabilityLane:
    string;

  projectionBoundary:
    string;
}): OSARNetProjectionEnvelope {

  const valid =
    validateOSARProjectionAuthorization(
      input.authorization,
    );

  return Object.freeze({
    status:
      "NET_PROJECTION_ENVELOPE_CREATED",

    authorizationReference:
      input.authorization.decisionReference,

    capabilityLane:
      input.capabilityLane,

    projectionBoundary:
      input.projectionBoundary,

    decision:
      valid &&
      input.authorization.decision === "AUTHORIZED" &&
      input.capabilityLane.length > 0 &&
      input.projectionBoundary.length > 0
        ? "READY"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate NET projection envelope structure.
 *
 * Structural validation only.
 */
export function validateOSARNetProjectionEnvelope(
  envelope: OSARNetProjectionEnvelope,
): boolean {

  return (
    envelope.status ===
      "NET_PROJECTION_ENVELOPE_CREATED" &&
    envelope.authorizationReference.length > 0 &&
    envelope.capabilityLane.length > 0 &&
    envelope.projectionBoundary.length > 0 &&
    envelope.createdAt.length > 0 &&
    (
      envelope.decision === "READY" ||
      envelope.decision === "REVIEW" ||
      envelope.decision === "BLOCKED"
    )
  );
}
