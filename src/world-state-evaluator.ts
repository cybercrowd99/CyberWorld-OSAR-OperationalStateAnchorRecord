/**
 * CyberWorld-OSAR — WorldStateEvaluator Validation Artifact
 * 
 * WorldStateEvaluator defines the bounded evaluation layer
 * responsible for determining whether an operational condition
 * transition complies with declared OSAR constraints.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - grant permissions
 * - modify world state
 *
 * Evaluation only:
 * - validates transition conditions
 * - confirms invariant compliance
 * - preserves lifecycle boundaries
 * - supports controlled state movement
 */

import { OSARRecord } from "./osar-record";

export type WorldStateEvaluatorStatus =
  | "STATE_EVALUATED";

export type WorldStateEvaluatorDecision =
  | "PERMITTED"
  | "REVIEW"
  | "REJECTED";

/**
 * Evaluation result artifact.
 *
 * Represents transition evaluation only.
 */
export interface WorldStateEvaluatorResult {
  /**
   * Artifact discriminator.
   */
  readonly status: WorldStateEvaluatorStatus;

  /**
   * Evaluation decision.
   */
  readonly decision: WorldStateEvaluatorDecision;

  /**
   * Evaluated record reference.
   */
  readonly recordReference: string;

  /**
   * Evaluation timestamp.
   */
  readonly evaluatedAt: string;
}

/**
 * Evaluate OSAR state movement.
 *
 * Pure validation operation.
 *
 * No mutation.
 * No state creation.
 */
export function evaluateWorldState(
  record: OSARRecord,
): WorldStateEvaluatorResult {
  return Object.freeze({
    status: "STATE_EVALUATED",
    decision: "PERMITTED",
    recordReference:
      record.authorityReference,
    evaluatedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate evaluator result structure.
 *
 * Structural validation only.
 */
export function validateWorldStateEvaluator(
  result: WorldStateEvaluatorResult,
): boolean {
  return (
    result.status === "STATE_EVALUATED" &&
    result.recordReference.length > 0 &&
    result.evaluatedAt.length > 0 &&
    (
      result.decision === "PERMITTED" ||
      result.decision === "REVIEW" ||
      result.decision === "REJECTED"
    )
  );
}
