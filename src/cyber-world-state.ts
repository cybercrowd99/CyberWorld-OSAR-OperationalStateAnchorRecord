/**
 * CyberWorld-OSAR — CyberWorldState Condition Artifact
 * 
 * CyberWorldState defines the bounded operational condition
 * represented by an OSARRecord.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create permanent classification
 * - authorize actions
 * - modify world state
 *
 * Condition reference only:
 * - preserves represented condition
 * - maintains operational meaning
 * - supports bounded state interpretation
 */

export type CyberWorldStateStatus =
  | "STATE_REGISTERED";

export type CyberWorldStateType =
  | "OPERATIONAL_CONDITION"
  | "RESTRICTION"
  | "REVIEW_STATE"
  | "RELEASE_STATE"
  | "COMPLIANCE_STATE";

/**
 * CyberWorldState artifact.
 *
 * Represents a condition only.
 */
export interface CyberWorldState {
  /**
   * Artifact discriminator.
   */
  readonly status: CyberWorldStateStatus;

  /**
   * State reference identifier.
   */
  readonly stateReference: string;

  /**
   * Represented condition category.
   */
  readonly stateType: CyberWorldStateType;

  /**
   * Human-readable condition description.
   *
   * Describes condition meaning only.
   */
  readonly condition: string;

  /**
   * Supporting authority reference.
   */
  readonly authorityReference: string;

  /**
   * Supporting evidence relationship.
   */
  readonly evidenceReferences: readonly string[];

  /**
   * Declared operational scope.
   */
  readonly scopeReference: string;

  /**
   * State creation time.
   */
  readonly createdAt: string;
}

/**
 * Create CyberWorldState artifact.
 *
 * Pure condition registration.
 *
 * No authority.
 * No identity.
 * No ownership.
 * No world mutation.
 */
export function createCyberWorldState(input: {
  stateReference: string;
  stateType: CyberWorldStateType;
  condition: string;
  authorityReference: string;
  evidenceReferences: readonly string[];
  scopeReference: string;
  createdAt?: string;
}): CyberWorldState {
  return Object.freeze({
    status: "STATE_REGISTERED",
    stateReference: input.stateReference,
    stateType: input.stateType,
    condition: input.condition,
    authorityReference: input.authorityReference,
    evidenceReferences: Object.freeze([
      ...input.evidenceReferences,
    ]),
    scopeReference: input.scopeReference,
    createdAt:
      input.createdAt ?? new Date().toISOString(),
  });
}

/**
 * Validate CyberWorldState structure.
 *
 * Structural validation only.
 */
export function validateCyberWorldState(
  state: CyberWorldState,
): boolean {
  return (
    state.status === "STATE_REGISTERED" &&
    state.stateReference.length > 0 &&
    state.stateType.length > 0 &&
    state.condition.length > 0 &&
    state.authorityReference.length > 0 &&
    state.scopeReference.length > 0 &&
    state.createdAt.length > 0
  );
}
