/**
 * CyberWorld-OSAR — OSARStateScopeBinding Artifact
 * 
 * OSARStateScopeBinding defines the bounded attachment layer
 * connecting a represented operational condition with its
 * declared containment boundary.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - expand permissions
 * - modify operational state
 * - modify world state
 * - bypass No-Bleed Law
 *
 * Scope binding only:
 * - preserves condition-to-scope relationship
 * - maintains containment lineage
 * - supports boundary validation
 * - preserves operational lane separation
 */

import {
  OSARCondition,
  validateOSARCondition,
} from "./osar-condition";

import {
  OSARScopeBoundary,
  validateOSARScopeBoundary,
} from "./osar-scope-boundary";

export type OSARStateScopeBindingStatus =
  | "STATE_SCOPE_BOUND";

export type OSARStateScopeBindingDecision =
  | "BOUND"
  | "REVIEW"
  | "REJECTED";

/**
 * State scope binding artifact.
 */
export interface OSARStateScopeBinding {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARStateScopeBindingStatus;

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
   * Binding decision.
   */
  readonly decision:
    OSARStateScopeBindingDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create state scope binding artifact.
 *
 * Relationship representation only.
 */
export function createOSARStateScopeBinding(input: {
  condition:
    OSARCondition;

  scopeBoundary:
    OSARScopeBoundary;
}): OSARStateScopeBinding {

  const valid =
    validateOSARCondition(
      input.condition,
    ) &&
    validateOSARScopeBoundary(
      input.scopeBoundary,
    );

  return Object.freeze({
    status:
      "STATE_SCOPE_BOUND",

    conditionReference:
      input.condition.conditionReference,

    scopeReference:
      input.scopeBoundary.scopeReference,

    operationalLane:
      input.scopeBoundary.operationalLane,

    decision:
      valid
        ? "BOUND"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate state scope binding structure.
 *
 * Structural validation only.
 */
export function validateOSARStateScopeBinding(
  binding: OSARStateScopeBinding,
): boolean {

  return (
    binding.status ===
      "STATE_SCOPE_BOUND" &&
    binding.conditionReference.length > 0 &&
    binding.scopeReference.length > 0 &&
    binding.operationalLane.length > 0 &&
    binding.createdAt.length > 0 &&
    (
      binding.decision === "BOUND" ||
      binding.decision === "REVIEW" ||
      binding.decision === "REJECTED"
    )
  );
}
