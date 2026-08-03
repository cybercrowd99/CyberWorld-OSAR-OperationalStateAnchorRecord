/**
 * CyberWorld-OSAR — Clock Law Invariant Artifact
 *
 * Clock Law defines the bounded temporal invariant that prevents
 * represented operational conditions from becoming uncontrolled
 * permanent states.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - extend lifecycle automatically
 * - modify world state
 *
 * Temporal validation only:
 * - confirms time boundaries
 * - validates expiration conditions
 * - preserves lifecycle containment
 */

export type ClockLawStatus =
  | "CLOCK_VALIDATED";

export type ClockLawDecision =
  | "VALID"
  | "EXPIRED"
  | "INVALID_TIME_RANGE";

/**
 * Clock Law validation artifact.
 *
 * Represents temporal evaluation only.
 */
export interface ClockLawResult {
  /**
   * Artifact discriminator.
   */
  readonly status: ClockLawStatus;

  /**
   * Temporal decision.
   */
  readonly decision: ClockLawDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt: string;

  /**
   * Expiration timestamp.
   */
  readonly expiresAt: string;
}

/**
 * Evaluate Clock Law.
 *
 * Pure temporal comparison.
 *
 * No lifecycle mutation.
 * No authority mutation.
 */
export function evaluateClockLaw(input: {
  createdAt: string;
  expiresAt: string;
  currentTime?: string;
}): ClockLawResult {
  const created =
    new Date(input.createdAt).getTime();

  const expires =
    new Date(input.expiresAt).getTime();

  const current =
    new Date(
      input.currentTime ?? new Date().toISOString(),
    ).getTime();

  let decision: ClockLawDecision;

  if (
    Number.isNaN(created) ||
    Number.isNaN(expires) ||
    expires <= created
  ) {
    decision = "INVALID_TIME_RANGE";
  } else if (current >= expires) {
    decision = "EXPIRED";
  } else {
    decision = "VALID";
  }

  return Object.freeze({
    status: "CLOCK_VALIDATED",
    decision,
    createdAt: input.createdAt,
    expiresAt: input.expiresAt,
  });
}

/**
 * Validate Clock Law result structure.
 *
 * Structural validation only.
 */
export function validateClockLaw(
  result: ClockLawResult,
): boolean {
  return (
    result.status === "CLOCK_VALIDATED" &&
    result.createdAt.length > 0 &&
    result.expiresAt.length > 0 &&
    (
      result.decision === "VALID" ||
      result.decision === "EXPIRED" ||
      result.decision === "INVALID_TIME_RANGE"
    )
  );
}
