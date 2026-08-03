/**
 * CyberWorld-OSAR — OSAR Flow Controller Artifact
 *
 * OSAR Flow Controller defines the bounded orchestration layer
 * responsible for maintaining the approved progression path:
 *
 * EventOSAR
 *     ↓
 * CyberWorldState
 *     ↓
 * OSARAnchor
 *     ↓
 * OSARRecord
 *     ↓
 * CORE Evaluation
 *     ↓
 * NET Projection
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - bypass invariants
 * - modify world state
 *
 * Flow coordination only:
 * - preserves artifact lineage
 * - preserves ordering
 * - preserves containment boundaries
 * - preserves lifecycle movement
 */

import { OSARRecord } from "./osar-record";
import { OSARCoreBinding } from "./osar-core-binding";
import { WorldStateEvaluatorResult } from "./world-state-evaluator";
import { NetSurfacePacket } from "./net-surface-packet";

export type OSARFlowStatus =
  | "FLOW_COMPLETED";

export type OSARFlowDecision =
  | "READY"
  | "BLOCKED"
  | "REVIEW";

/**
 * Flow continuity artifact.
 */
export interface OSARFlowControllerResult {
  readonly status:
    OSARFlowStatus;

  readonly decision:
    OSARFlowDecision;

  readonly recordReference:
    string;

  readonly coreBindingReference:
    string;

  readonly createdAt:
    string;
}

/**
 * Create OSAR flow result.
 *
 * Coordination only.
 */
export function createOSARFlowControllerResult(input: {
  record: OSARRecord;
  coreBinding: OSARCoreBinding;
  evaluation: WorldStateEvaluatorResult;
  packet?: NetSurfacePacket;
}): OSARFlowControllerResult {

  const decision: OSARFlowDecision =
    input.evaluation.decision === "PERMITTED"
      ? "READY"
      : input.evaluation.decision === "REVIEW"
        ? "REVIEW"
        : "BLOCKED";

  return Object.freeze({
    status:
      "FLOW_COMPLETED",
    decision,
    recordReference:
      input.evaluation.recordReference,
    coreBindingReference:
      input.coreBinding.recordReference,
    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate flow result.
 *
 * Structural validation only.
 */
export function validateOSARFlowControllerResult(
  result: OSARFlowControllerResult,
): boolean {
  return (
    result.status === "FLOW_COMPLETED" &&
    result.recordReference.length > 0 &&
    result.coreBindingReference.length > 0 &&
    result.createdAt.length > 0 &&
    (
      result.decision === "READY" ||
      result.decision === "REVIEW" ||
      result.decision === "BLOCKED"
    )
  );
}
