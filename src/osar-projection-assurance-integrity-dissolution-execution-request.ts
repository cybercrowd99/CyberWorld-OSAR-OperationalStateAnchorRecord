/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityDissolutionExecutionRequest
 *
 * Bounded dissolution execution-request representation layer.
 *
 * This artifact records a handoff signal after a dissolution decision has
 * approved lifecycle transition.
 *
 * It does not:
 * - execute deletion
 * - shred cryptographic keys
 * - control vault systems
 * - control Biff lanes
 * - control Dewey surfaces
 * - mutate OSAR artifacts
 * - mutate ledgers
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 *
 * Execution-request representation only:
 * - preserves approved lifecycle transition reference
 * - records execution handoff intent
 * - maintains immutable checkpoint ordering
 * - supports structural lifecycle review
 */

import {
  OSARProjectionAssuranceIntegrityDissolutionDecision,
  validateOSARProjectionAssuranceIntegrityDissolutionDecision,
} from "./osar-projection-assurance-integrity-dissolution-decision";


export type OSARProjectionAssuranceIntegrityDissolutionExecutionRequestStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_REQUEST_RECORDED";


export type OSARProjectionAssuranceIntegrityDissolutionExecutionRequestDecision =
  | "READY"
  | "REVIEW";


export interface OSARProjectionAssuranceIntegrityDissolutionExecutionRequest {

  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityDissolutionExecutionRequestStatus;


  /**
   * Source dissolution decision reference.
   */
  readonly dissolutionDecisionReference:
    string;


  /**
   * Immutable execution-request anchor.
   */
  readonly executionRequestReference:
    string;


  /**
   * Ordered lifecycle lineage.
   */
  readonly lineage:
    readonly string[];


  /**
   * Structural execution readiness state.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityDissolutionExecutionRequestDecision;


  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}


/**
 * Create dissolution execution-request representation.
 *
 * Pure lifecycle handoff representation only.
 */
export function createOSARProjectionAssuranceIntegrityDissolutionExecutionRequest(
  input: {
    dissolutionDecision:
      OSARProjectionAssuranceIntegrityDissolutionDecision;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityDissolutionExecutionRequest {

  const validDecision =
    validateOSARProjectionAssuranceIntegrityDissolutionDecision(
      input.dissolutionDecision,
    );

  const ready =
    validDecision &&
    input.dissolutionDecision.outcome === "APPROVED" &&
    input.lineage.length > 0;


  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_REQUEST_RECORDED",

    dissolutionDecisionReference:
      input.dissolutionDecision.decisionReference,

    executionRequestReference:
      `DISSOLUTION-EXECUTION-REQUEST-${Date.now()}`,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      ready
        ? "READY"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}


/**
 * Validate dissolution execution-request structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityDissolutionExecutionRequest(
  request:
    OSARProjectionAssuranceIntegrityDissolutionExecutionRequest,
): boolean {

  return (

    request.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_REQUEST_RECORDED"

    && request.dissolutionDecisionReference.length > 0

    && request.executionRequestReference.length > 0

    && request.lineage.length > 0

    && (
      request.decision === "READY" ||
      request.decision === "REVIEW"
    )

    && request.createdAt.length > 0
  );
}
