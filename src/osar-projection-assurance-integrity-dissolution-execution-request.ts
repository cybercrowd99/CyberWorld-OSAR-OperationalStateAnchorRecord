/**
 * OSAR Projection Assurance Integrity Dissolution Execution Request
 *
 * Purpose:
 * - Record a bounded dissolution execution handoff request.
 * - Preserve lifecycle transition intent without executing dissolution.
 * - Maintain minimal immutable references.
 *
 * Does NOT:
 * - delete artifacts
 * - shred keys
 * - control vault systems
 * - control Biff lanes
 * - control Dewey surfaces
 * - mutate ledgers
 * - create identity, ownership, or authority
 */

export type DissolutionExecutionRequestState =
  | "ELIGIBLE"
  | "REVIEW";

export interface OSARProjectionAssuranceIntegrityDissolutionExecutionRequest {
  readonly status:
    "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_REQUEST_RECORDED";

  /**
   * Source dissolution request anchor.
   */
  readonly dissolutionRequestReference: string;

  /**
   * Immutable execution request anchor.
   */
  readonly executionRequestReference: string;

  /**
   * Artifact lifecycle boundary reference.
   */
  readonly artifactReference: string;

  /**
   * Ordered lifecycle lineage.
   */
  readonly lineage: readonly string[];

  readonly executionRequestState:
    DissolutionExecutionRequestState;

  readonly createdAt: number;
}

export interface CreateDissolutionExecutionRequestInput {
  readonly dissolutionRequestReference: string;
  readonly artifactReference: string;
  readonly lineage: readonly string[];
}

/**
 * Creates a bounded execution handoff request.
 */
export const createOSARProjectionAssuranceIntegrityDissolutionExecutionRequest =
(
  input: CreateDissolutionExecutionRequestInput
): OSARProjectionAssuranceIntegrityDissolutionExecutionRequest => {

  const valid =
    Boolean(input.dissolutionRequestReference) &&
    Boolean(input.artifactReference) &&
    Array.isArray(input.lineage) &&
    input.lineage.length > 0;

  if (!valid) {
    throw new Error(
      "INVALID_DISSOLUTION_EXECUTION_REQUEST"
    );
  }

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_REQUEST_RECORDED",

    dissolutionRequestReference:
      input.dissolutionRequestReference,

    executionRequestReference:
      `execution-request:${crypto.randomUUID()}`,

    artifactReference:
      input.artifactReference,

    lineage:
      Object.freeze([...input.lineage]),

    executionRequestState:
      "ELIGIBLE",

    createdAt:
      Date.now(),
  });
};


/**
 * Structural validation only.
 */
export const validateOSARProjectionAssuranceIntegrityDissolutionExecutionRequest =
(
  request:
    OSARProjectionAssuranceIntegrityDissolutionExecutionRequest
): boolean => {

  return (
    request.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_EXECUTION_REQUEST_RECORDED" &&

    Boolean(request.dissolutionRequestReference) &&
    Boolean(request.executionRequestReference) &&
    Boolean(request.artifactReference) &&

    request.lineage.length > 0 &&

    Number.isFinite(request.createdAt)
  );
};


/**
 * Structural execution eligibility evaluation only.
 */
export const evaluateOSARProjectionAssuranceIntegrityDissolutionExecutionRequest =
(
  request:
    OSARProjectionAssuranceIntegrityDissolutionExecutionRequest
): DissolutionExecutionRequestState => {

  return validateOSARProjectionAssuranceIntegrityDissolutionExecutionRequest(
    request
  )
    ? "ELIGIBLE"
    : "REVIEW";
};
