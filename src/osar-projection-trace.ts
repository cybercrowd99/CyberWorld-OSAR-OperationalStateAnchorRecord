/**
 * CyberWorld-OSAR — OSARProjectionTrace Artifact
 * 
 * OSARProjectionTrace defines the bounded trace layer
 * responsible for preserving the lineage of a controlled
 * surface projection path.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize access
 * - expand visibility
 * - interpret behavior
 * - modify OSAR artifacts
 * - modify world state
 *
 * Trace representation only:
 * - preserves projection lineage
 * - records artifact continuity
 * - maintains boundary references
 * - supports structural auditing
 */

import {
  OSARSurfaceProjectionRecord,
  validateOSARSurfaceProjectionRecord,
} from "./osar-surface-projection-record";

export type OSARProjectionTraceStatus =
  | "PROJECTION_TRACE_RECORDED";

export type OSARProjectionTraceDecision =
  | "TRACEABLE"
  | "REVIEW"
  | "INVALID";

/**
 * Projection trace artifact.
 */
export interface OSARProjectionTrace {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionTraceStatus;

  /**
   * Surface projection reference.
   */
  readonly projectionReference:
    string;

  /**
   * Trace lineage reference.
   */
  readonly lineageReference:
    string;

  /**
   * Trace decision.
   */
  readonly decision:
    OSARProjectionTraceDecision;

  /**
   * Trace timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection trace artifact.
 *
 * Trace recording only.
 */
export function createOSARProjectionTrace(input: {
  projection:
    OSARSurfaceProjectionRecord;

  lineageReference:
    string;
}): OSARProjectionTrace {

  const valid =
    validateOSARSurfaceProjectionRecord(
      input.projection,
    );

  return Object.freeze({
    status:
      "PROJECTION_TRACE_RECORDED",

    projectionReference:
      input.projection.envelopeReference,

    lineageReference:
      input.lineageReference,

    decision:
      valid &&
      input.lineageReference.length > 0
        ? "TRACEABLE"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection trace structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionTrace(
  trace: OSARProjectionTrace,
): boolean {

  return (
    trace.status ===
      "PROJECTION_TRACE_RECORDED" &&
    trace.projectionReference.length > 0 &&
    trace.lineageReference.length > 0 &&
    trace.createdAt.length > 0 &&
    (
      trace.decision === "TRACEABLE" ||
      trace.decision === "REVIEW" ||
      trace.decision === "INVALID"
    )
  );
}
