/**
 * CyberWorld-OSAR — OSARConditionTransition Artifact
 * 
 * OSARConditionTransition defines the bounded movement
 * representation between registered OSAR conditions.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize actions
 * - modify operational state
 * - modify world state
 * - bypass lifecycle controls
 *
 * Transition representation only:
 * - preserves source condition
 * - preserves target condition reference
 * - preserves evaluation lineage
 * - supports controlled movement recording
 */

import {
  OSARCondition,
  validateOSARCondition,
} from "./osar-condition";

export type OSARConditionTransitionStatus =
  | "CONDITION_TRANSITION_RECORDED";

export type OSARConditionTransitionDecision =
  | "PERMITTED"
  | "REVIEW"
  | "REJECTED";

/**
 * Condition transition artifact.
 */
export interface OSARConditionTransition {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARConditionTransitionStatus;

  /**
   * Source condition reference.
   */
  readonly sourceConditionReference:
    string;

  /**
   * Target condition reference.
   */
  readonly targetConditionReference:
    string;

  /**
   * Transition decision.
   */
  readonly decision:
    OSARConditionTransitionDecision;

  /**
   * Transition reason.
   */
  readonly reason:
    string;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create condition transition artifact.
 *
 * Transition representation only.
 */
export function createOSARConditionTransition(input: {
  sourceCondition:
    OSARCondition;

  targetCondition:
    OSARCondition;

  reason:
    string;
}): OSARConditionTransition {

  const valid =
    validateOSARCondition(
      input.sourceCondition,
    ) &&
    validateOSARCondition(
      input.targetCondition,
    );

  return Object.freeze({
    status:
      "CONDITION_TRANSITION_RECORDED",

    sourceConditionReference:
      input.sourceCondition.conditionReference,

    targetConditionReference:
      input.targetCondition.conditionReference,

    decision:
      valid
        ? "PERMITTED"
        : "REVIEW",

    reason:
      input.reason,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate condition transition structure.
 *
 * Structural validation only.
 */
export function validateOSARConditionTransition(
  transition: OSARConditionTransition,
): boolean {

  return (
    transition.status ===
      "CONDITION_TRANSITION_RECORDED" &&
    transition.sourceConditionReference.length > 0 &&
    transition.targetConditionReference.length > 0 &&
    transition.reason.length > 0 &&
    transition.createdAt.length > 0 &&
    (
      transition.decision === "PERMITTED" ||
      transition.decision === "REVIEW" ||
      transition.decision === "REJECTED"
    )
  );
}
