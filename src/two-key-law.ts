/**
 * CyberWorld-OSAR — Two-Key Law Invariant Artifact
 * 
 * Two-Key Law defines the authority separation boundary requiring
 * deployment authority and release authority to remain independent.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - grant permissions
 * - authorize transactions
 * - modify operational state
 *
 * Authority separation validation only:
 * - confirms deployment/release separation
 * - prevents unilateral lifecycle control
 * - preserves release boundary integrity
 */

export type TwoKeyLawStatus =
  | "TWO_KEY_VALIDATED";

export type TwoKeyLawDecision =
  | "VALID"
  | "REJECTED";

/**
 * Two-Key Law validation artifact.
 *
 * Represents authority relationship validation only.
 */
export interface TwoKeyLawResult {
  /**
   * Artifact discriminator.
   */
  readonly status: TwoKeyLawStatus;

  /**
   * Validation decision.
   */
  readonly decision: TwoKeyLawDecision;

  /**
   * Authority responsible for deployment.
   */
  readonly deploymentAuthorityReference: string;

  /**
   * Authority responsible for release.
   */
  readonly releaseAuthorityReference: string;
}

/**
 * Evaluate Two-Key Law.
 *
 * Deployment authority and release authority
 * must remain separated.
 *
 * No authority creation.
 * No permission creation.
 */
export function evaluateTwoKeyLaw(input: {
  deploymentAuthorityReference: string;
  releaseAuthorityReference: string;
}): TwoKeyLawResult {
  const decision: TwoKeyLawDecision =
    input.deploymentAuthorityReference.length > 0 &&
    input.releaseAuthorityReference.length > 0 &&
    input.deploymentAuthorityReference !==
      input.releaseAuthorityReference
      ? "VALID"
      : "REJECTED";

  return Object.freeze({
    status: "TWO_KEY_VALIDATED",
    decision,
    deploymentAuthorityReference:
      input.deploymentAuthorityReference,
    releaseAuthorityReference:
      input.releaseAuthorityReference,
  });
}

/**
 * Validate Two-Key Law result structure.
 *
 * Structural validation only.
 */
export function validateTwoKeyLaw(
  result: TwoKeyLawResult,
): boolean {
  return (
    result.status === "TWO_KEY_VALIDATED" &&
    result.deploymentAuthorityReference.length > 0 &&
    result.releaseAuthorityReference.length > 0 &&
    (
      result.decision === "VALID" ||
      result.decision === "REJECTED"
    )
  );
}
