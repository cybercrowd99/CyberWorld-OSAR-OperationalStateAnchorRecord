/**
 * CyberWorld-OSAR — OSARCondition Artifact
 *
 * OSARCondition defines the bounded condition representation
 * used to describe an operational condition before it is attached
 * through OSAR anchoring and record structures.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - modify world state
 * - assign permissions
 *
 * Condition representation only:
 * - preserves semantic meaning
 * - preserves scope reference
 * - preserves condition lineage
 * - supports bounded state description
 */

export type OSARConditionStatus =
  | "CONDITION_REGISTERED";

export type OSARConditionType =
  | "OPERATIONAL"
  | "TEMPORAL"
  | "GOVERNANCE"
  | "RECOVERY";

/**
 * OSAR condition artifact.
 */
export interface OSARCondition {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARConditionStatus;

  /**
   * Condition reference.
   */
  readonly conditionReference:
    string;

  /**
   * Condition category.
   */
  readonly conditionType:
    OSARConditionType;

  /**
   * Descriptive condition value.
   */
  readonly condition:
    string;

  /**
   * Declared scope reference.
   */
  readonly scopeReference:
    string;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create OSAR condition artifact.
 *
 * Semantic representation only.
 */
export function createOSARCondition(input: {
  conditionReference: string;
  conditionType: OSARConditionType;
  condition: string;
  scopeReference: string;
  createdAt?: string;
}): OSARCondition {

  return Object.freeze({
    status:
      "CONDITION_REGISTERED",

    conditionReference:
      input.conditionReference,

    conditionType:
      input.conditionType,

    condition:
      input.condition,

    scopeReference:
      input.scopeReference,

    createdAt:
      input.createdAt ??
      new Date().toISOString(),
  });
}

/**
 * Validate OSAR condition structure.
 *
 * Structural validation only.
 */
export function validateOSARCondition(
  condition: OSARCondition,
): boolean {

  return (
    condition.status ===
      "CONDITION_REGISTERED" &&
    condition.conditionReference.length > 0 &&
    condition.condition.length > 0 &&
    condition.scopeReference.length > 0 &&
    condition.createdAt.length > 0 &&
    (
      condition.conditionType === "OPERATIONAL" ||
      condition.conditionType === "TEMPORAL" ||
      condition.conditionType === "GOVERNANCE" ||
      condition.conditionType === "RECOVERY"
    )
  );
}
