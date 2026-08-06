/**
 * CyberWorld-OSAR — Label Law Invariant Artifact
 * 
 * Label Law defines the semantic boundary requiring represented
 * operational conditions to maintain descriptive meaning.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create moral classification
 * - create operational state
 * - modify world state
 *
 * Semantic validation only:
 * - confirms condition labeling
 * - prevents identity mutation
 * - preserves operational meaning
 */

export type LabelLawStatus =
  | "LABEL_VALIDATED";

export type LabelLawDecision =
  | "VALID"
  | "REJECTED";

/**
 * Label Law validation artifact.
 *
 * Represents semantic evaluation only.
 */
export interface LabelLawResult {
  /**
   * Artifact discriminator.
   */
  readonly status: LabelLawStatus;

  /**
   * Validation decision.
   */
  readonly decision: LabelLawDecision;

  /**
   * Declared operational label.
   */
  readonly label: string;
}

/**
 * Identity-sensitive labels are prohibited.
 *
 * OSAR represents conditions,
 * not identity.
 */
const PROHIBITED_LABEL_PATTERNS = [
  "person",
  "identity",
  "criminal",
  "dangerous",
  "bad",
  "good",
];

/**
 * Evaluate Label Law.
 *
 * Pure semantic boundary validation.
 *
 * No mutation.
 * No classification creation.
 */
export function evaluateLabelLaw(
  label: string,
): LabelLawResult {
  const normalized =
    label.toLowerCase();

  const invalid =
    PROHIBITED_LABEL_PATTERNS.some(
      (pattern) =>
        normalized.includes(pattern),
    );

  return Object.freeze({
    status: "LABEL_VALIDATED",
    decision: invalid
      ? "REJECTED"
      : "VALID",
    label,
  });
}

/**
 * Validate Label Law result structure.
 *
 * Structural validation only.
 */
export function validateLabelLaw(
  result: LabelLawResult,
): boolean {
  return (
    result.status === "LABEL_VALIDATED" &&
    result.label.length > 0 &&
    (
      result.decision === "VALID" ||
      result.decision === "REJECTED"
    )
  );
}
