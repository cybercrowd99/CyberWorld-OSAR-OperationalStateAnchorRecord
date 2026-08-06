/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityDissolutionExecutionResult
 * 
 * Bounded dissolution execution-result representation layer.
 *
 * This artifact records the structural outcome of a dissolution execution
 * handoff after an execution request has been accepted.
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
 * Execution-result representation only:
 * - records lifecycle execution outcome
 * - preserves minimal transition references
 * - maintains immutable result checkpoints
 * - supports structural dissolution review
 */

import {
  OSARProjectionAssuranceIntegrityDissolutionExecutionRequest,
  validateOSARProjectionAssuranceIntegrityDissolutionExecutionRequest,
} from "./osar-projection-assurance-integrity-dissolution-execution-request";


export type OSARProjectionAssuranceIntegrityDissolutionExecutionResultStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_RESULT_RECORDED";


export type OSARProjectionAssuranceIntegrityDissolutionExecutionResultOutcome =
  | "COMPLETED"
  | "REVIEW";


export interface OSARProjectionAssuranceIntegrityDissolutionExecutionResult {

  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityDissolutionExecutionResultStatus;


  /**
   * Source execution request reference.
   */
  readonly executionRequestReference:
    string;


  /**
   * Immutable execution result anchor.
   */
  readonly executionResultReference:
    string;


  /**
   * Execution completion witness.
   *
   * Reference only.
   */
  readonly completionWitness:
    string;


  /**
   * Ordered lifecycle lineage.
   */
  readonly lineage:
    readonly string[];


  /**
   * Structural execution outcome.
   */
  readonly outcome:
    OSARProjectionAssuranceIntegrityDissolutionExecutionResultOutcome;


  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}


/**
 * Create dissolution execution-result representation.
 *
 * Pure lifecycle result representation only.
 */
export function createOSARProjectionAssuranceIntegrityDissolutionExecutionResult(
  input: {
    executionRequest:
      OSARProjectionAssuranceIntegrityDissolutionExecutionRequest;

    completionWitness:
      string;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityDissolutionExecutionResult {

  const validRequest =
    validateOSARProjectionAssuranceIntegrityDissolutionExecutionRequest(
      input.executionRequest,
    );

  const completed =
    validRequest &&
    input.executionRequest.decision === "READY" &&
    input.completionWitness.length > 0 &&
    input.lineage.length > 0;


  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_RESULT_RECORDED",

    executionRequestReference:
      input.executionRequest.executionRequestReference,

    executionResultReference:
      `DISSOLUTION-EXECUTION-RESULT-${Date.now()}`,

    completionWitness:
      input.completionWitness,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    outcome:
      completed
        ? "COMPLETED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}


/**
 * Validate dissolution execution-result structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityDissolutionExecutionResult(
  result:
    OSARProjectionAssuranceIntegrityDissolutionExecutionResult,
): boolean {

  return (

    result.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_RESULT_RECORDED"

    && result.executionRequestReference.length > 0

    && result.executionResultReference.length > 0

    && result.completionWitness.length > 0

    && result.lineage.length > 0

    && (
      result.outcome === "COMPLETED" ||
      result.outcome === "REVIEW"
    )

    && result.createdAt.length > 0
  );
}
