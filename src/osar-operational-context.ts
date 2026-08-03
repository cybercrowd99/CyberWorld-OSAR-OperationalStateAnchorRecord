/**
 * CyberWorld-OSAR — OSAROperationalContext Artifact
 *
 * OSAROperationalContext defines the bounded context layer
 * responsible for describing where an operational envelope
 * is being represented.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - assign permissions
 * - modify operational state
 * - modify world state
 * - expand scope
 *
 * Context representation only:
 * - preserves operational placement
 * - preserves lane relationship
 * - maintains containment references
 * - supports controlled projection
 */

import {
  OSAROperationalEnvelope,
  validateOSAROperationalEnvelope,
} from "./osar-operational-envelope";

export type OSAROperationalContextStatus =
  | "CONTEXT_REGISTERED";

export type OSAROperationalContextDecision =
  | "VALID"
  | "REVIEW"
  | "INVALID";

/**
 * Operational context artifact.
 */
export interface OSAROperationalContext {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSAROperationalContextStatus;

  /**
   * Envelope reference.
   */
  readonly envelopeReference:
    string;

  /**
   * Operational lane.
   */
  readonly operationalLane:
    string;

  /**
   * Context boundary.
   */
  readonly contextBoundary:
    string;

  /**
   * Context decision.
   */
  readonly decision:
    OSAROperationalContextDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create operational context artifact.
 *
 * Context representation only.
 */
export function createOSAROperationalContext(input: {
  envelope:
    OSAROperationalEnvelope;

  contextBoundary:
    string;
}): OSAROperationalContext {

  const valid =
    validateOSAROperationalEnvelope(
      input.envelope,
    );

  return Object.freeze({
    status:
      "CONTEXT_REGISTERED",

    envelopeReference:
      input.envelope.scopeReference,

    operationalLane:
      input.envelope.operationalLane,

    contextBoundary:
      input.contextBoundary,

    decision:
      valid &&
      input.contextBoundary.length > 0
        ? "VALID"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate operational context structure.
 *
 * Structural validation only.
 */
export function validateOSAROperationalContext(
  context: OSAROperationalContext,
): boolean {

  return (
    context.status ===
      "CONTEXT_REGISTERED" &&
    context.envelopeReference.length > 0 &&
    context.operationalLane.length > 0 &&
    context.contextBoundary.length > 0 &&
    context.createdAt.length > 0 &&
    (
      context.decision === "VALID" ||
      context.decision === "REVIEW" ||
      context.decision === "INVALID"
    )
  );
}
