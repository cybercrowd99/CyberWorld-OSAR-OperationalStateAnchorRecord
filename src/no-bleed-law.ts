/**
 * CyberWorld-OSAR — No-Bleed Law Invariant Artifact
 * 
 * No-Bleed Law defines the bounded scope invariant that prevents
 * represented operational conditions from escaping their declared
 * operational boundary.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - expand scope
 * - enforce external actions
 * - modify world state
 *
 * Boundary validation only:
 * - confirms scope alignment
 * - prevents uncontrolled propagation
 * - preserves operational isolation
 */

export type NoBleedLawStatus =
  | "NO_BLEED_VALIDATED";

export type NoBleedLawDecision =
  | "VALID"
  | "REJECTED";

/**
 * No-Bleed validation artifact.
 *
 * Represents invariant evaluation only.
 */
export interface NoBleedLawResult {
  /**
   * Artifact discriminator.
   */
  readonly status: NoBleedLawStatus;

  /**
   * Validation decision.
   */
  readonly decision: NoBleedLawDecision;

  /**
   * Declared scope.
   */
  readonly declaredScope: string;

  /**
   * Requested scope.
   */
  readonly requestedScope: string;
}

/**
 * Evaluate No-Bleed Law.
 *
 * Pure structural scope comparison.
 *
 * No state mutation.
 * No authority mutation.
 */
export function evaluateNoBleedLaw(input: {
  declaredScope: string;
  requestedScope: string;
}): NoBleedLawResult {
  const decision: NoBleedLawDecision =
    input.declaredScope === input.requestedScope
      ? "VALID"
      : "REJECTED";

  return Object.freeze({
    status: "NO_BLEED_VALIDATED",
    decision,
    declaredScope: input.declaredScope,
    requestedScope: input.requestedScope,
  });
}

/**
 * Validate No-Bleed Law result structure.
 *
 * Structural validation only.
 */
export function validateNoBleedLaw(
  result: NoBleedLawResult,
): boolean {
  return (
    result.status === "NO_BLEED_VALIDATED" &&
    result.declaredScope.length > 0 &&
    result.requestedScope.length > 0 &&
    (result.decision === "VALID" ||
      result.decision === "REJECTED")
  );
}
