/**
 * CyberWorld-OSAR — OSARSurfaceProjectionRecord Artifact
 *
 * OSARSurfaceProjectionRecord defines the bounded surface
 * projection record layer responsible for representing a
 * controlled NET projection event after handoff validation.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - grant permissions
 * - expand visibility
 * - expose restricted information
 * - modify OSAR artifacts
 * - modify world state
 *
 * Surface projection record only:
 * - preserves NET handoff lineage
 * - records projection condition
 * - maintains boundary references
 * - supports projection traceability
 */

import {
  OSARNetProjectionEnvelope,
  validateOSARNetProjectionEnvelope,
} from "./osar-net-projection-envelope";

export type OSARSurfaceProjectionRecordStatus =
  | "SURFACE_PROJECTION_RECORDED";

export type OSARSurfaceProjectionDecision =
  | "PROJECTED"
  | "REVIEW"
  | "REJECTED";

/**
 * Surface projection record artifact.
 */
export interface OSARSurfaceProjectionRecord {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARSurfaceProjectionRecordStatus;

  /**
   * NET envelope reference.
   */
  readonly envelopeReference:
    string;

  /**
   * Surface lane.
   */
  readonly surfaceLane:
    string;

  /**
   * Projection boundary.
   */
  readonly projectionBoundary:
    string;

  /**
   * Projection decision.
   */
  readonly decision:
    OSARSurfaceProjectionDecision;

  /**
   * Projection timestamp.
   */
  readonly projectedAt:
    string;
}

/**
 * Create surface projection record artifact.
 *
 * Projection recording only.
 */
export function createOSARSurfaceProjectionRecord(input: {
  envelope:
    OSARNetProjectionEnvelope;

  surfaceLane:
    string;
}): OSARSurfaceProjectionRecord {

  const valid =
    validateOSARNetProjectionEnvelope(
      input.envelope,
    );

  return Object.freeze({
    status:
      "SURFACE_PROJECTION_RECORDED",

    envelopeReference:
      input.envelope.authorizationReference,

    surfaceLane:
      input.surfaceLane,

    projectionBoundary:
      input.envelope.projectionBoundary,

    decision:
      valid &&
      input.envelope.decision === "READY" &&
      input.surfaceLane.length > 0
        ? "PROJECTED"
        : "REVIEW",

    projectedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate surface projection record structure.
 *
 * Structural validation only.
 */
export function validateOSARSurfaceProjectionRecord(
  record: OSARSurfaceProjectionRecord,
): boolean {

  return (
    record.status ===
      "SURFACE_PROJECTION_RECORDED" &&
    record.envelopeReference.length > 0 &&
    record.surfaceLane.length > 0 &&
    record.projectionBoundary.length > 0 &&
    record.projectedAt.length > 0 &&
    (
      record.decision === "PROJECTED" ||
      record.decision === "REVIEW" ||
      record.decision === "REJECTED"
    )
  );
}
