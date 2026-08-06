/**
 * CyberWorld-OSAR — OSARTransition Artifact
 * 
 * OSARTransition defines the bounded transition representation
 * for controlled movement between validated operational conditions.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - modify world state
 * - bypass lifecycle rules
 *
 * Transition representation only:
 * - records permitted movement
 * - preserves source condition
 * - preserves target condition
 * - preserves evaluation lineage
 * - preserves lifecycle containment
 */

import { OSARRecord } from "./osar-record";
import {
  WorldStateEvaluatorResult,
} from "./world-state-evaluator";

export type OSARTransitionStatus =
  | "TRANSITION_RECORDED";

export type OSARTransitionDecision =
  | "PERMITTED"
  | "REVIEW"
  | "REJECTED";

/**
 * Transition artifact.
 */
export interface OSARTransition {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARTransitionStatus;

  /**
   * Transition decision.
   */
  readonly decision:
    OSARTransitionDecision;

  /**
   * Source record reference.
   */
  readonly sourceRecordReference:
    string;

  /**
   * Target condition reference.
   */
  readonly targetStateReference:
    string;

  /**
   * Evaluation reference.
   */
  readonly evaluationReference:
    string;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create OSAR transition artifact.
 *
 * Transition representation only.
 */
export function createOSARTransition(input: {
  sourceRecord: OSARRecord;
  targetStateReference: string;
  evaluation: WorldStateEvaluatorResult;
}): OSARTransition {

  return Object.freeze({
    status:
      "TRANSITION_RECORDED",

    decision:
      input.evaluation.decision,

    sourceRecordReference:
      input.evaluation.recordReference,

    targetStateReference:
      input.targetStateReference,

    evaluationReference:
      input.evaluation.recordReference,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate OSAR transition structure.
 *
 * Structural validation only.
 */
export function validateOSARTransition(
  transition: OSARTransition,
): boolean {
  return (
    transition.status ===
      "TRANSITION_RECORDED" &&
    transition.sourceRecordReference.length > 0 &&
    transition.targetStateReference.length > 0 &&
    transition.evaluationReference.length > 0 &&
    transition.createdAt.length > 0 &&
    (
      transition.decision === "PERMITTED" ||
      transition.decision === "REVIEW" ||
      transition.decision === "REJECTED"
    )
  );
}
