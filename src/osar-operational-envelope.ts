/**
 * CyberWorld-OSAR — OSAROperationalEnvelope Artifact
 * 
 * OSAROperationalEnvelope defines the bounded aggregation
 * layer responsible for carrying approved OSAR structural
 * relationships as one contained operational representation.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - expand permissions
 * - modify operational state
 * - modify world state
 * - bypass OSAR invariants
 *
 * Envelope representation only:
 * - preserves artifact relationships
 * - preserves condition lineage
 * - preserves scope containment
 * - supports controlled operational handling
 */

import {
  OSARStateScopeBinding,
  validateOSARStateScopeBinding,
} from "./osar-state-scope-binding";

export type OSAROperationalEnvelopeStatus =
  | "OPERATIONAL_ENVELOPE_CREATED";

export type OSAROperationalEnvelopeDecision =
  | "READY"
  | "REVIEW"
  | "REJECTED";

/**
 * Operational envelope artifact.
 */
export interface OSAROperationalEnvelope {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSAROperationalEnvelopeStatus;

  /**
   * Condition reference.
   */
  readonly conditionReference:
    string;

  /**
   * Scope reference.
   */
  readonly scopeReference:
    string;

  /**
   * Operational lane.
   */
  readonly operationalLane:
    string;

  /**
   * Envelope decision.
   */
  readonly decision:
    OSAROperationalEnvelopeDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create operational envelope artifact.
 *
 * Aggregation representation only.
 */
export function createOSAROperationalEnvelope(input: {
  binding:
    OSARStateScopeBinding;
}): OSAROperationalEnvelope {

  const valid =
    validateOSARStateScopeBinding(
      input.binding,
    );

  return Object.freeze({
    status:
      "OPERATIONAL_ENVELOPE_CREATED",

    conditionReference:
      input.binding.conditionReference,

    scopeReference:
      input.binding.scopeReference,

    operationalLane:
      input.binding.operationalLane,

    decision:
      valid
        ? "READY"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate operational envelope structure.
 *
 * Structural validation only.
 */
export function validateOSAROperationalEnvelope(
  envelope: OSAROperationalEnvelope,
): boolean {

  return (
    envelope.status ===
      "OPERATIONAL_ENVELOPE_CREATED" &&
    envelope.conditionReference.length > 0 &&
    envelope.scopeReference.length > 0 &&
    envelope.operationalLane.length > 0 &&
    envelope.createdAt.length > 0 &&
    (
      envelope.decision === "READY" ||
      envelope.decision === "REVIEW" ||
      envelope.decision === "REJECTED"
    )
  );
}
